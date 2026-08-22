import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ProduitOffre {
  id: number;
  nom: string;
  prix: string;
  image?: string;
  image_url?: string;
}


export interface Promotion {
  id: number;
  code: string;
  taux_remise: string;
  type_remise: 'pourcentage' | 'montant_fixe';
  date_debut: string;
  date_fin: string;
  est_active: boolean;
  limite_usage: number;
  nombre_utilise: number;
  est_valide: boolean;
  boutique: string;
  produits: ProduitOffre[];
}


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private http = inject(HttpClient);

  private api = '/api/produits/';


  getProduits(params?: any): Observable<any> {

    let httpParams = new HttpParams();

    if (params) {

      Object.keys(params).forEach(key => {

        if (
          params[key] !== null &&
          params[key] !== undefined &&
          params[key] !== ''
        ) {

          httpParams = httpParams.set(
            key,
            params[key]
          );

        }

      });

    }

    return this.http.get<any>(
      this.api,
      {
        params: httpParams
      }
    );

  }


  getProduit(id: number): Observable<any> {

    return this.http.get<any>(
      `${this.api}${id}/`
    );

  }


  rechercher(texte: string) {

    return this.http.get<any>(
      this.api,
      {
        params: {
          recherche: texte
        }
      }
    );

  }


  // ==========================================================
  // OFFRES / PROMOTIONS PUBLIQUES
  // ==========================================================

  getOffres(): Observable<Promotion[]> {

    return this.http.get<Promotion[]>(
      `${this.api}offres/`
    );

  }

}