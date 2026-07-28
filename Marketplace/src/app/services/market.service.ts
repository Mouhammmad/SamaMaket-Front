import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductItem {
  id: number;
  nom: string;
  description: string;
  prix: number;
  quantite_stock: number;
  image_url?: string | null;
  categorie?: string | null;
  est_actif: boolean;
  boutique_id?: number;
  boutique?: string;
}

export interface BoutiqueSummary {
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

export interface PromotionItem {
  id: number;
  code: string;
  taux_remise: number;
  type_remise: string;
  date_debut: string;
  date_fin: string;
  est_active: boolean;
  boutique: string;
  produits: Array<{ id: number; nom: string }>;
}

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private api = '/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductItem[]> {
    return this.http.get<ProductItem[]>(`${this.api}/produits/`);
  }

  getBoutiques(): Observable<BoutiqueSummary[]> {
    return this.http.get<BoutiqueSummary[]>(`${this.api}/boutiques/`);
  }

  getPromotions(): Observable<PromotionItem[]> {
    return this.http.get<PromotionItem[]>(`${this.api}/produits/promotions/`);
  }
}
