import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isAuthRequest = this.isAuthRequest(request);

    // Get the auth token - first try the service, then fall back to localStorage
    const authToken = this.authService.getToken() ?? localStorage.getItem('access_token');

    if (authToken && !isAuthRequest) {
      console.log(`[✓ Interceptor] Adding token to ${request.method} ${request.url}`);
    } else {
      console.log(`[✗ Interceptor] No token for ${request.method} ${request.url}`);
    }

    // Clone the request and add the authorization header if token exists
    if (authToken && !isAuthRequest) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    // Pass the cloned request to the next handler
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !isAuthRequest) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private isAuthRequest(request: HttpRequest<unknown>): boolean {
    const url = request.url.toLowerCase();
    return (
      url.includes('/api/comptes/login/') ||
      url.includes('/api/comptes/register/') ||
      url.includes('/api/token/') ||
      url.includes('/api/token/refresh/')
    );
  }

  /**
   * Handle 401 errors with token refresh
   */
  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.access);
          
          const newToken = this.authService.getToken();
          const newRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });
          
          return next.handle(newRequest);
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => err);
        })
      );
    } else {
      // Wait for the token to be refreshed
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          const newRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(newRequest);
        })
      );
    }
  }
}
