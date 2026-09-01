import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defer, Observable } from 'rxjs';
import { toApiUrl } from '../../../core/api.config';

@Injectable({
  providedIn: 'root'
})
export class AdminProduitsService {

  private api = '/api/produits/admin/produits/';

  constructor(private http: HttpClient) {}

  getProduits(): Observable<any> {
    return this.requeteAdmin(this.api);
  }

  getProduit(id: number): Observable<any> {
    return this.http.get(`${this.api}${id}/`);
  }

  modifierProduit(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.api}${id}/`, data);
  }

  changerStatutProduit(id: number, estActif: boolean): Observable<any> {
    return this.http.patch(`${this.api}${id}/`, {
      est_actif: estActif
    });
  }

  supprimerProduit(id: number): Observable<any> {
    return this.http.delete(`${this.api}${id}/`);
  }

  private requeteAdmin<T>(url: string): Observable<T> {
    return defer(async () => {
      const token = localStorage.getItem('access');
      const apiUrl = toApiUrl(url);
      const response = await fetch(apiUrl, {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : undefined
      });
      const body = await response.text();
      const data = body.trim() ? JSON.parse(body) : {};

      if (!response.ok) {
        throw { status: response.status, error: data };
      }

      return data as T;
    });
  }
}