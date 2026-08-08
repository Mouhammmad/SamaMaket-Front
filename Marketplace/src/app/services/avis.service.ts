import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AvisProduit {
  id: number;
  utilisateur: string;
  produit_id: number;
  note: number;
  commentaire: string;
  est_approuve: boolean;
  date_creation: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private api = '/api/produits/avis';

  constructor(private http: HttpClient) {}

  ajouterAvis(produitId: number, note: number, commentaire: string): Observable<any> {
    return this.http.post<any>(`${this.api}/ajouter/`, {
      produit_id: produitId,
      note,
      commentaire
    });
  }

  getAvisProduit(produitId: number): Observable<AvisProduit[]> {
    return this.http.get<AvisProduit[]>(`${this.api}/avis_produit/`, {
      params: { produit_id: produitId.toString() }
    });
  }
}
