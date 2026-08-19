import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Boutique {
  id: number;

  nom: string;
  description: string;
  ville: string;
  pays?: string;

  telephone?: string;
  email?: string;
  whatsapp?: string;

  logo?: string;
  logo_url?: string;

  banniere?: string;
  banniere_url?: string;

  note: number;
  followers: number;
  abonnes?: number;
  ventes: number;

  apprové: boolean;
  verifie: boolean;

  categorie?: string;
  categories?: any[];

  nombre_produits?: number;
  nombre_avis?: number;
  repartition_notes?: any;
  total_produits?: number;
}

export interface StatutSuivi {
  suivi: boolean;
  followers: number;
}

export interface ReponseSuivi {
  suivi: boolean;
  followers: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  private apiUrl = '/api/boutiques/';

  constructor(
    private http: HttpClient
  ) {}

  // ==========================================================
  // BOUTIQUES
  // ==========================================================

  getBoutiques(): Observable<Boutique[]> {

    return this.http.get<Boutique[]>(
      this.apiUrl
    );

  }

  getBoutique(id: number): Observable<Boutique> {

    return this.http.get<Boutique>(
      `${this.apiUrl}${id}/`
    );

  }

  getProduitsBoutique(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/produits/`);
  }

  getAvisBoutique(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/avis/`);
  }

  getPromotionsBoutique(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/promotions/`);
  }

  // ==========================================================
  // MA BOUTIQUE
  // ==========================================================

  getMaBoutique(): Observable<Boutique> {

    return this.http.get<Boutique>(
      `${this.apiUrl}ma/`
    );

  }

  // ==========================================================
  // CREER UNE BOUTIQUE
  // ==========================================================

  creerBoutique(
    data: FormData
  ): Observable<Boutique> {

    return this.http.post<Boutique>(
      `${this.apiUrl}create/`,
      data
    );

  }

  // ==========================================================
  // MODIFIER UNE BOUTIQUE
  // ==========================================================

  modifierBoutique(
    id: number,
    data: FormData
  ): Observable<Boutique> {

    return this.http.put<Boutique>(
      `${this.apiUrl}${id}/`,
      data
    );

  }

  // ==========================================================
  // SUIVRE UNE BOUTIQUE
  // ==========================================================

  suivreBoutique(
    boutiqueId: number
  ): Observable<ReponseSuivi> {

    return this.http.post<ReponseSuivi>(
      `${this.apiUrl}${boutiqueId}/suivre/`,
      {}
    );

  }

  // ==========================================================
  // NE PLUS SUIVRE UNE BOUTIQUE
  // ==========================================================

  nePlusSuivreBoutique(
    boutiqueId: number
  ): Observable<ReponseSuivi> {

    return this.http.delete<ReponseSuivi>(
      `${this.apiUrl}${boutiqueId}/suivre/`
    );

  }

  // ==========================================================
  // STATUT DU SUIVI
  // ==========================================================

  getStatutSuivi(
    boutiqueId: number
  ): Observable<StatutSuivi> {

    return this.http.get<StatutSuivi>(
      `${this.apiUrl}${boutiqueId}/suivi/`
    );

  }

}