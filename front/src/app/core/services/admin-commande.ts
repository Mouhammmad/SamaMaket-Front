import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Commande } from '../models/commande';

@Injectable({
  providedIn: 'root'
})
export class AdminCommandesService {

  private apiUrl =
    'http://127.0.0.1:8000/api/commandes/admin/commandes/';

  constructor(
    private http: HttpClient
  ) {}

  // ==========================================================
  // LISTE DES COMMANDES
  // ==========================================================

  getCommandes(): Observable<Commande[]> {

    return this.http.get<Commande[]>(
      this.apiUrl
    );
  }

  // ==========================================================
  // DETAIL D'UNE COMMANDE
  // ==========================================================

  getCommande(id: number): Observable<Commande> {

    return this.http.get<Commande>(
      `${this.apiUrl}${id}/`
    );
  }

  // ==========================================================
  // MODIFIER LE STATUT
  // ==========================================================

  modifierStatut(
    id: number,
    statut: string
  ): Observable<Commande> {

    return this.http.patch<Commande>(
      `${this.apiUrl}${id}/`,
      {
        statut
      }
    );
  }

  // ==========================================================
  // SUPPRIMER UNE COMMANDE
  // ==========================================================

  supprimerCommande(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}${id}/`
    );
  }
}