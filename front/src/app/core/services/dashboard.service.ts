import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private api = '/api/dashboard/vendeur/';

  constructor(private http: HttpClient) {}

  recentOrders(): Observable<any> {
    return this.http.get<any>(`${this.api}commandes-recentes/`);
  }

  revenueChart(period: string): Observable<any> {
    return this.http.get<any>(`${this.api}graphique-revenus/`, {
      params: { period }
    });
  }

  topProducts(): Observable<any> {
    return this.http.get<any>(`${this.api}produits/`);
  }
}
