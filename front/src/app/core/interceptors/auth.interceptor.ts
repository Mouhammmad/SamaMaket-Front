import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, from, map, switchMap, throwError } from 'rxjs';

const TOKEN_REFRESH_URL = 'http://127.0.0.1:8000/api/token/refresh/';
const PUBLIC_AUTH_SKIP_PATHS = ['/api/produits/categories/'];

function shouldSkipAuth(url: string): boolean {
  return PUBLIC_AUTH_SKIP_PATHS.some((path) => url.includes(path));
}

function parseJwt(token: string): { exp?: number } | null {
  try {
    const [, payload] = token.split('.');
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(
      decoded
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    ));
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  if (!payload?.exp) {
    return false;
  }
  return Math.floor(Date.now() / 1000) >= payload.exp;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  const isAuthRequest = req.url.includes('/api/comptes/login/') || req.url.includes('/api/comptes/register/') || req.url.includes('/api/token/refresh/');
  const skipAuth = shouldSkipAuth(req.url);
  const attachAuth = !!token && !isAuthRequest && !skipAuth && !isTokenExpired(token);

  const authReq = attachAuth
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthRequest) {
        if (skipAuth) {
          return next(req);
        }

        if (!refreshToken) {
          return throwError(() => error);
        }

        return from(
          fetch(TOKEN_REFRESH_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
          })
        ).pipe(
          switchMap((response) => {
            if (!response.ok) {
              return throwError(() => new Error('Token refresh failed'));
            }
            return from(response.json());
          }),
          map((data: any) => data?.access),
          switchMap((newAccessToken) => {
            if (newAccessToken) {
              localStorage.setItem('access', newAccessToken);
            }
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken ?? token}`
              }
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};