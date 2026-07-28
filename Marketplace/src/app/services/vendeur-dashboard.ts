import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VendeurStats {
  revenue: number;
  orders: number;
  products: number;
  rating: number;
  boutique?: { id: number; nom: string; logo_url?: string | null } | null;
}

export interface Produit {
  id: number;
  nom: string;
  description?: string | null;
  prix: number;
  quantite_stock: number;
  est_actif: boolean;
  image_url?: string | null;
  image?: string | null;
}

export interface Commande {
  id: number;
  customer_username: string;
  total_price: number;
  status: string;
  created_at: string;
  items: Array<{product: string; quantity: number; price: string}>;
}

@Injectable({
  providedIn: 'root'
})
export class VendeurDashboard {
  private api = '/api/dashboard/vendeur';

  constructor(private http: HttpClient) { }

  /**
   * Get vendor dashboard statistics with period filtering
   */
  getStatsWithToken(token: string, period: string = 'mois'): Observable<VendeurStats> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<VendeurStats>(`${this.api}/stats/?period=${period}`, { headers });
  }

  /**
   * Get vendor products
   */
  getProductsWithToken(token: string): Observable<Produit[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Produit[]>(`${this.api}/produits/`, { headers });
  }

  /**
   * Get revenue graph data (buckets) for the chosen period
   */
  getRevenueGraph(token: string, period: string = 'mois'): Observable<Array<{label: string; revenue: number}>> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<Array<{label: string; revenue: number}>>(`${this.api}/graphique-revenus/?period=${period}`, { headers });
  }

  /**
   * Get sales by category for the chosen period
   */
  getSalesByCategory(token: string, period: string = 'mois'): Observable<Array<{category: string; sales: number; revenue: number}>> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<Array<{category: string; sales: number; revenue: number}>>(`${this.api}/categorie-vendeur/?period=${period}`, { headers });
  }

  /**
   * Get recent orders
   */
  getOrdersWithToken(token: string): Observable<Commande[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Commande[]>(`${this.api}/commandes-recentes/`, { headers });
  }

  /**
   * Create a new product for the vendor's boutique
   */
  createProductWithToken(token: string, payload: any) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.api}/produits/`, payload, { headers });
  }

  updateOrderStatus(token: string, orderId: number, status: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.patch(`${this.api}/commandes/${orderId}/mettre_a_jour_statut/`, { statut: status }, { headers });
  }
}
