import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  private api = '/api/commandes/livraisons/';

  constructor(
    private http: HttpClient
  ) {}

  getLivraisons(): Observable<any> {

    return this.http.get<any>(
      this.api
    );

  }

  getLivraison(id: number): Observable<any> {

    return this.http.get<any>(
      `${this.api}${id}/`
    );

  }

  modifierLivraison(id: number, data: any): Observable<any> {

    return this.http.patch<any>(
      `${this.api}${id}/`,
      data
    );

  }

  supprimerLivraison(id: number): Observable<any> {

    return this.http.delete(
      `${this.api}${id}/`
    );

  }

  rechercherLivraisons(recherche: string): Observable<any> {

    return this.http.get<any>(
      `${this.api}?search=${recherche}`
    );

  }

  filtrerParStatut(statut: string): Observable<any> {

    return this.http.get<any>(
      `${this.api}?statut=${statut}`
    );

  }

}