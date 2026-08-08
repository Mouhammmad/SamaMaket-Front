import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FavoriApiItem {
  id: number;
  produit?: {
    id: number;
    nom: string;
    prix: number;
    image?: string;
    image_url?: string;
    boutique?: string;
  };
  produit_id?: number;
  date_ajout?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavorisService {
  private api = '/api/produits/favoris';

  constructor(private http: HttpClient) {}

  getFavoris(): Observable<FavoriApiItem[]> {
    return this.http.get<FavoriApiItem[]>(`${this.api}/`);
  }

  ajouterFavori(produitId: number): Observable<any> {
    return this.http.post<any>(`${this.api}/`, { produit_id: produitId });
  }

  supprimerFavori(favoriId: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${favoriId}/`);
  }
}
