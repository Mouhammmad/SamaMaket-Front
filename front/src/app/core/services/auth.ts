import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://127.0.0.1:8000/api/comptes/';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(this.api + 'register/', data);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.api + 'login/', data);
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
  }

  estConnecte(): boolean {
    return !!localStorage.getItem('access');
  }

  getUser(): any {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return null;
      }
    }

    const token = localStorage.getItem('access');
    if (!token) {
      return null;
    }

    try {
      const [, payload] = token.split('.');
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(decoded.split('').map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join('')));
    } catch {
      return null;
    }
  }

  getDisplayName(): string {
    const user = this.getUser();
    if (!user) {
      return 'Vendeur';
    }

    const firstName = user.first_name || user.prenom || '';
    const lastName = user.last_name || user.nom || '';
    const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

    return fullName || user.username || user.email || 'Vendeur';
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  isVendor(): boolean {
    return this.getUserRole() === 'VENDOR';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isCustomer(): boolean {
    return this.getUserRole() === 'CUSTOMER';
  }
}