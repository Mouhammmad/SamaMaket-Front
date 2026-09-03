import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  private api = '/api/produits/avis/';

  constructor(
    private http: HttpClient
  ) {}

  getAvis(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  getMesAvis(): Observable<any> {
    // Appelle l'endpoint dédié qui retourne les avis de l'utilisateur
    return this.http.get<any>(`${this.api}mes/`);
  }

  getAvisProduit(produitId: number): Observable<any> {
    return this.http.get<any>(`${this.api}?produit_id=${produitId}`);
  }

  ajouterAvis(produitId: number, note: number, commentaire: string): Observable<any> {
    return this.http.post<any>(`${this.api}ajouter/`, {
      produit_id: produitId,
      note,
      commentaire
    });
  }

  supprimerAvis(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}${id}/supprimer/`);
  }

  getAvisVendeur(): Observable<any> {
    return this.http.get<any>(`${this.api}?vendeur=true`);
  }

  getAvisDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}${id}/`);
  }

  rechercherAvis(recherche: string): Observable<any> {
    return this.http.get<any>(`${this.api}?search=${recherche}`);
  }

  filtrerParNote(note: string): Observable<any> {
    return this.http.get<any>(`${this.api}?note=${note}`);
  }

  approuverAvis(id: number): Observable<any> {
    return this.http.patch<any>(`${this.api}${id}/`, {
      est_approuve: true
    });
  }

}