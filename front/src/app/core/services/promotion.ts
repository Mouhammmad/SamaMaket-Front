import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private apiUrl = '/api/produits/promotions/';

  constructor(private http: HttpClient) {}

  getPromotions(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  ajouterPromotion(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  modifierPromotion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }

  supprimerPromotion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

}