import { HttpBackend, HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

const TOKEN_REFRESH_URL = '/api/token/refresh/';
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
  const normalizedUrl = req.url.toLowerCase();
  const isAuthRequest = normalizedUrl.includes('/api/comptes/login/') || normalizedUrl.includes('/api/comptes/register/') || normalizedUrl.includes('/api/token/refresh/');
  const skipAuth = shouldSkipAuth(normalizedUrl);
  const isApiRequest = normalizedUrl.includes('/api/') || normalizedUrl.includes('127.0.0.1:8000') || normalizedUrl.includes('localhost:8000');
  const tokenExpired = token ? isTokenExpired(token) : false;
  const attachAuth = !!token && !isAuthRequest && !skipAuth && isApiRequest && !tokenExpired;
  const authReq = attachAuth
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  const http = new HttpClient(inject(HttpBackend));

  const refreshAccessToken = () => {
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token'));
    }
    console.log('[AuthInterceptor] refreshing access token');
    return http.post<any>(TOKEN_REFRESH_URL, { refresh: refreshToken }).pipe(
      switchMap((data) => {
        const newAccessToken = data?.access;
        if (!newAccessToken) {
          return throwError(() => new Error('No access token returned')); 
        }
        localStorage.setItem('access', newAccessToken);
        const retryReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newAccessToken}`
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
  };

  console.log(`[AuthInterceptor] ${req.method} ${req.url} attachAuth=${attachAuth} token=${!!token} expired=${tokenExpired} isAuthRequest=${isAuthRequest} skipAuth=${skipAuth} isApiRequest=${isApiRequest}`);

  if (tokenExpired && !isAuthRequest && !skipAuth && isApiRequest) {
    return refreshAccessToken();
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(`[AuthInterceptor] error ${req.method} ${req.url} status=${error.status}`);
      if (error.status === 401 && !isAuthRequest && !skipAuth && isApiRequest) {
        return refreshAccessToken();
      }
      return throwError(() => error);
    })
  );
};