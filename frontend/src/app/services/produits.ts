import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Produits } from '../models/produits';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private apiUrl = 'http://127.0.0.1:8000/api/produits/';

  constructor(private http: HttpClient) {}

  getProduits(): Observable<Produits[]> {
    return this.http.get<Produits[]>(this.apiUrl);
  }
  getProduit(id: number): Observable<Produits> {
    return this.http.get<Produits>(`${this.apiUrl}${id}/`);
}
 getProduitsRecherche(recherche: string): Observable<Produits[]> {
  return this.http.get<Produits[]>(
    `${this.apiUrl}?search=${recherche}`
  );
}
}