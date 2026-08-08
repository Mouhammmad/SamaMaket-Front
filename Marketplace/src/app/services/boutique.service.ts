import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BoutiqueApi {
  id: number;
  nom: string;
  description: string;
  ville: string;
  logo_url?: string | null;
  note: number;
  followers: number;
  ventes: number;
  total_produits: number;
}

export interface ProduitBoutique {
  id: number;
  nom: string;
  prix: number;
  quantite_stock: number;
  est_actif: boolean;
  image_url?: string | null;
  categorie?: string | null;
}

export interface AvisBoutique {
  id: number;
  note: number;
  commentaire?: string | null;
  utilisateur?: string;
  date_creation?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private api = '/api/boutiques';

  constructor(private http: HttpClient) {}

  getBoutique(id: number): Observable<BoutiqueApi> {
    return this.http.get<BoutiqueApi>(`${this.api}/${id}/`);
  }

  getProducts(id: number): Observable<ProduitBoutique[]> {
    return this.http.get<ProduitBoutique[]>(`${this.api}/${id}/produits/`);
  }

  getReviews(id: number): Observable<AvisBoutique[]> {
    return this.http.get<AvisBoutique[]>(`${this.api}/${id}/avis/`);
  }

  createBoutiqueWithToken(token: string, data: {nom: string; description: string; ville: string;}) {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<BoutiqueApi>(`${this.api}/create/`, data, { headers });
  }
}
