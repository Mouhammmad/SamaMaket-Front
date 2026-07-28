import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStats {
  utilisateurs_total: number;
  nouveaux_utilisateurs_ce_mois: number;
  vendeurs_actifs: number;
  vendeurs_en_attente: number;
  produits_total: number;
  commandes_total: number;
  commandes_du_jour: number;
  commandes_ce_mois: number;
  commandes_mois_precedent: number;
  commandes_change_pct: number | null;
}

export interface Vendeur {
  id: number;
  nom: string;
  proprietaire: string;
  categorie: string;
  email?: string;
  apprové: boolean;
}

export interface Utilisateur {
  id: number;
  username: string;
  email: string;
  role: string;
  date_joined: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {

  private api = '/api/dashboard/admin';

  constructor(private http: HttpClient) {}

  /**
   * Get dashboard statistics
   * Note: The JWT token will be automatically added by the AuthInterceptor
   */
  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.api}/stats/`);
  }

  /**
   * Get dashboard statistics with token explicitly provided
   */
  getStatsWithToken(token: string): Observable<DashboardStats> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<DashboardStats>(`${this.api}/stats/`, { headers });
  }

  /**
   * Get pending vendors (en attente d'approbation)
   */
  getVendorsWithToken(token: string): Observable<Vendeur[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Vendeur[]>(`${this.api}/vendeur_en_attente/`, { headers });
  }

  /**
   * Get recent users
   */
  getRecentUsersWithToken(token: string): Observable<Utilisateur[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Utilisateur[]>(`${this.api}/utilisateurs_recents/`, { headers });
  }

  approuverVendeur(token: string, boutiqueId: number, approve: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.api}/vendeur_en_attente/`, { boutique_id: boutiqueId, approve }, { headers });
  }
}