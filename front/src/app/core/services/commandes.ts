import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

@Injectable({

  providedIn: 'root'

})
export class CommandeService {

  api = '/api/commandes/';

  constructor(

    private http: HttpClient

  ) {}

  getCommandes(): Observable<any> {

    return this.http.get(this.api + 'commandes/mes_commandes/');

  }

  getMesCommandes(): Observable<any> {

    return this.http.get(this.api + 'commandes/mes_commandes/');

  }
    getMesCommandesVendeur(): Observable<any> {
      return this.http.get(this.api + 'vendeur/commandes/mes_commandes/');
    }

    getNotifications(): Observable<any> {
      return this.http.get(this.api + 'commandes/notifications/');
    }

    marquerToutesNotificationsLues(): Observable<any> {
      return this.http.post(this.api + 'commandes/marquer_toutes_lues/', {});
    }

  getResume(): Observable<any> {
    return this.http.get(this.api + 'commandes/resume/');
  }

  changerStatut(id: number, statut: string): Observable<any> {

    return this.http.patch(
      this.api + 'vendeur/commandes/' + id + '/mettre_a_jour_statut/',
      { statut }
    );

  }

  dashboard(): Observable<any> {

    return this.http.get(this.api + 'vendeur/commandes/dashboard/');

  }

  supprimerCommande(id: number): Observable<any> {
    return this.http.delete(this.api + 'vendeur/commandes/' + id + '/');
  }

  validerPanier(data: any): Observable<any> {

    return this.http.post(
      this.api + 'commandes/valider_panier/',
      data
    );

  }

  creerCommande(data: any): Observable<any> {

    return this.validerPanier(data);

  }

  modifierStatut(

    id: number,

    statut: string

  ): Observable<any> {

    return this.http.patch(

      this.api + 'commandes/' + id + '/mettre_a_jour_statut/',

      {

        statut

      }

    );

  }

  getCommande(id: number): Observable<any> {

    return this.getMesCommandes().pipe(
      map((response: any) => {
        const commandes = Array.isArray(response) ? response : response?.results || [];
        return commandes.find((commande: any) => Number(commande.id) === Number(id)) || null;
      })
    );

  }
}