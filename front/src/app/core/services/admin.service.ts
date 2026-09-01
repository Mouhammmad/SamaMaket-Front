import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defer, Observable } from 'rxjs';
import { toApiUrl } from '../api.config';


export interface AdminProduit {
  id: number;
  nom: string;
  description: string;
  marque: string;
  sku: string | null;
  slug: string | null;
  etat: string;
  prix: string;
  quantite_stock: number;
  poids: string;
  largeur: string;
  hauteur: string;
  longueur: string;
  mots_cles: string;
  image: string | null;
  image_url: string | null;
  images: any[];
  variantes: any[];
  categorie: string;
  categorie_id?: number;
  boutique_id: number;
  boutique: string;
  est_actif: boolean;
  date_creation: string;
  nombre_favoris: number;
  nombre_avis: number;
  note_moyenne: number;
  promotion_active: any;
  prix_promo: number;
  disponible: boolean;
  stock_status: string;
  est_favori: boolean;
}

export interface AdminProduitsResponse {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: AdminProduit[];
}

export interface AdminBoutique {
  id: number;
  nom: string;
  ville: string;
  note: number;
  apprové: boolean;
  proprietaire: string;
  categorie: string;
  email: string;
  description: string;
}

export interface AdminUtilisateur {
  id: number;
  username: string;
  nom: string;
  email: string;
  role: string;
  phone: string | null;
  date_joined: string;
  is_active: boolean;
  statut: string;
}

export interface AdminUtilisateursResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminUtilisateur[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private api = '/api/dashboard/admin/';

  constructor(private http: HttpClient) {}

  // =====================================================
  // STATISTIQUES
  // =====================================================

  getStats(): Observable<any> {
    return this.http.get<any>(
      `${this.api}stats/`
    );
  }


  // =====================================================
  // VENDEURS EN ATTENTE
  // =====================================================

  getVendeursEnAttente(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.api}vendeur_en_attente/`
    );
  }


  // =====================================================
  // UTILISATEURS RECENTS
  // =====================================================

  getUtilisateursRecents(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.api}utilisateurs_recents/`
    );
  }


  // =====================================================
  // TOUS LES UTILISATEURS
  // =====================================================

  getUtilisateurs(
    search = ''
  ): Observable<AdminUtilisateursResponse> {

    const searchValue = search.trim();
    const url = searchValue
      ? `${this.api}utilisateurs/?search=${encodeURIComponent(searchValue)}`
      : `${this.api}utilisateurs/`;

    return this.requeteAdmin<AdminUtilisateursResponse>(url);

  }


  // =====================================================
  // DETAIL UTILISATEUR
  // =====================================================

  getUtilisateur(
    id: number
  ): Observable<any> {

    return this.requeteAdmin<any>(
      `${this.api}utilisateurs/${id}/`
    );

  }

  private requeteAdmin<T>(url: string, options: RequestInit = {}): Observable<T> {
    return defer(async () => {
      const token = localStorage.getItem('access');
      const headers = new Headers(options.headers);
      const apiUrl = toApiUrl(url);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      const response = await fetch(apiUrl, {
        ...options,
        headers
      });
      const content = await response.text();
      let result: T | undefined;

      if (content.trim()) {
        try {
          result = JSON.parse(content) as T;
        } catch {
          throw new Error('Réponse JSON invalide.');
        }
      }

      if (!response.ok) {
        throw {
          status: response.status,
          error: result || { detail: 'Erreur de la requête.' }
        };
      }

      return (result || {}) as T;
    });
  }


  // =====================================================
  // SUSPENDRE UTILISATEUR
  // =====================================================

  suspendreUtilisateur(
    id: number
  ): Observable<any> {

    return this.http.patch(
      `${this.api}utilisateurs/${id}/gestion/`,
      {
        action: 'suspendre'
      }
    );

  }


  // =====================================================
  // REACTIVER UTILISATEUR
  // =====================================================

  reactiverUtilisateur(
    id: number
  ): Observable<any> {

    return this.http.patch(
      `${this.api}utilisateurs/${id}/gestion/`,
      {
        action: 'reactiver'
      }
    );

  }


  // =====================================================
  // SUPPRIMER UTILISATEUR
  // =====================================================

  supprimerUtilisateur(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.api}utilisateurs/${id}/gestion/`
    );

  }


  // =====================================================
  // BOUTIQUES / VENDEURS
  // =====================================================

  getBoutiques(): Observable<AdminBoutique[]> {
    return this.requeteAdmin<AdminBoutique[]>(
    `${this.api}boutiques/`
  );
}

getBoutique(id: number): Observable<AdminBoutique> {
  return this.requeteAdmin<AdminBoutique>(
    `${this.api}boutiques/${id}/`
  );
}

validerBoutique(
  id: number,
  approve: boolean
): Observable<any> {

  return this.requeteAdmin(
    `${this.api}vendeur_en_attente/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        boutique_id: id,
        approve
      })
    }
  );

}
getProduits(
  page: number = 1,
  search: string = ''
): Observable<AdminProduitsResponse> {

  let url =
    `${this.api}produits/?page=${page}`;

  if (search.trim()) {

    url +=
      `&search=${encodeURIComponent(search.trim())}`;

  }

  return this.http.get<AdminProduitsResponse>(url);

}
getProduit(id: number): Observable<AdminProduit> {

  return this.http.get<AdminProduit>(
    `${this.api}produits/${id}/`
  );

}
}