import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private api = '/api/produits/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.api);
  }

  getProduct(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.api}${id}/`);
  }

}