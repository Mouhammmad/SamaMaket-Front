import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ParametresBoutique {
  nom: string;
  description: string;
  ville: string;

  telephone: string;
  email: string;
  whatsapp: string;

  zones_livraison: string;
  delai_livraison: string;
  frais_livraison: string | number;

  retours_acceptes: boolean;
  delai_retour: number;

  wave_actif: boolean;
  orange_money_actif: boolean;

  notifications_commandes: boolean;
  notifications_avis: boolean;
  notifications_messages: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ParametreBoutiqueService {

  private apiUrl = '/api/boutiques/ma/parametres/';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer les paramètres de la boutique
   */
  getParametres(): Observable<ParametresBoutique> {

    return this.http.get<ParametresBoutique>(
      this.apiUrl
    );

  }

  /**
   * Enregistrer les paramètres de la boutique
   */
  modifierParametres(
    parametres: Partial<ParametresBoutique>
  ): Observable<ParametresBoutique> {

    return this.http.put<ParametresBoutique>(
      this.apiUrl,
      parametres
    );

  }

}