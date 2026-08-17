import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProduitsService {

  private api = 'http://127.0.0.1:8000/api/produits/';

  constructor(private http: HttpClient) {}

  getProduits(): Observable<any> {
    return this.http.get(this.api);
  }

  getProduit(id: number): Observable<any> {
    return this.http.get(`${this.api}${id}/`);
  }

  modifierProduit(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.api}${id}/`, data);
  }

  supprimerProduit(id: number): Observable<any> {
    return this.http.delete(`${this.api}${id}/`);
  }
}