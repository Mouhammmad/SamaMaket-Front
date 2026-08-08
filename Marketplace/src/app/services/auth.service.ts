import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface LoginResponse extends TokenResponse {
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api';
  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get the stored token from localStorage
   */
  getStoredToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Get the current token
   */
  getToken(): string | null {
    return this.tokenSubject.value ?? this.getStoredToken();
  }

  /**
   * Login and get JWT token
   */
  login(username: string, password: string): Observable<LoginResponse> {
    // Use the comptes login endpoint which returns tokens + user info
    return this.http.post<LoginResponse>(`${this.apiUrl}/comptes/login/`, {
      username,
      password
    }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        if (response.user) {
          localStorage.setItem('current_user', JSON.stringify(response.user));
        }
        this.tokenSubject.next(response.access);
      })
    );
  }

  /**
   * Register a new user
   */
  register(data: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comptes/register/`, data);
  }

  /**
   * Clear authentication and reload the token from localStorage
   */
  clearAndReload(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.tokenSubject.next(null);
  }

  /**
   * Logout
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
    this.tokenSubject.next(null);
  }

  getCurrentUser(): any | null {
    const raw = localStorage.getItem('current_user');
    return raw ? JSON.parse(raw) : null;
  }

  getCurrentUserRole(): string | null {
    const u = this.getCurrentUser();
    return u ? (u.role || null) : null;
  }

  /**
   * Refresh the access token
   */
  refreshToken(): Observable<TokenResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<TokenResponse>(`${this.apiUrl}/token/refresh/`, {
      refresh: refreshToken
    }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access);
        this.tokenSubject.next(response.access);
      })
    );
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
