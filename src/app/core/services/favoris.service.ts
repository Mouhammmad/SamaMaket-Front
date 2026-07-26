import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FavorisService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMesFavoris() {
    return this.http.get(`${this.apiUrl}/favoris/mes_favoris/`);
  }
  ajouter(produitId: number) {
    return this.http.post(`${this.apiUrl}/favoris/ajouter/`, { produit_id: produitId });
  }
  supprimer(id: number) {
    return this.http.delete(`${this.apiUrl}/favoris/${id}/supprimer/`);
  }
}