import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ProduitAccueil {
  id: number;
  nom: string;
  prix: number;
  ancien_prix?: number;
  description?: string;
  image_url?: string;
  boutique?: { nom: string };
  note?: number;
  nombre_avis?: number;
}

export interface BoutiqueAccueil {
  id: number;
  nom: string;
  description?: string;
  categorie?: string;
  nombre_produits?: number;
  apprové: boolean;
  note?: number;
  logo_url?: string;
}

export interface Categorie {
  id?: number;
  nom: string;
  icon?: string;
  color?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccueilService {
  private api = '/api';

  constructor(private http: HttpClient) {}

  /**
   * Get featured products (with promotions or highest rated)
   */
  getProduittsVedettes(): Observable<ProduitAccueil[]> {
    return this.http.get<any[]>(`${this.api}/produits/`).pipe(
      map(produits => 
        produits
          .sort((a, b) => (b.note || 0) - (a.note || 0))
          .slice(0, 4)
          .map(p => ({
            id: p.id,
            nom: p.nom,
            prix: p.prix,
            ancien_prix: p.ancien_prix,
            description: p.description,
            image_url: p.image_url,
            boutique: p.boutique,
            note: p.note,
            nombre_avis: p.nombre_avis
          }))
      )
    );
  }

  /**
   * Get popular vendors (approved and with most products)
   */
  getVendeurspopulaires(): Observable<BoutiqueAccueil[]> {
    return this.http.get<any[]>(`${this.api}/boutiques/`).pipe(
      map(boutiques =>
        boutiques
          .filter((b: any) => b.apprové === true)
          .sort((a: any, b: any) => (b.nombre_produits || 0) - (a.nombre_produits || 0))
          .slice(0, 4)
          .map((b: any) => ({
            id: b.id,
            nom: b.nom,
            description: b.description,
            categorie: b.categorie,
            nombre_produits: b.nombre_produits,
            apprové: b.apprové,
            note: b.note,
            logo_url: b.logo_url
          }))
      )
    );
  }

  /**
   * Get newest products
   */
  getNouveauxProduits(): Observable<ProduitAccueil[]> {
    return this.http.get<any[]>(`${this.api}/produits/`).pipe(
      map(produits =>
        produits
          .sort((a, b) => new Date(b.date_creation || 0).getTime() - new Date(a.date_creation || 0).getTime())
          .slice(0, 4)
          .map(p => ({
            id: p.id,
            nom: p.nom,
            prix: p.prix,
            ancien_prix: p.ancien_prix,
            description: p.description,
            image_url: p.image_url,
            boutique: p.boutique,
            note: p.note,
            nombre_avis: p.nombre_avis
          }))
      )
    );
  }

  /**
   * Get all categories
   */
  getCategories(): Observable<Categorie[]> {
    return this.http.get<any[]>(`${this.api}/produits/categories/`).pipe(
      map(categories =>
        categories.map((c: any) => ({
          id: c.id,
          nom: c.nom,
          icon: c.icon || '📦',
          color: c.color || '#f0f0f0'
        }))
      )
    );
  }
}
