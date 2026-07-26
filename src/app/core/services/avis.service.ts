import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AvisService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  ajouter(produitId: number, note: number, commentaire: string) {
    return this.http.post(`${this.apiUrl}/avis/ajouter/`, { produit_id: produitId, note, commentaire });
  }
  getAvisProduit(produitId: number) {
    return this.http.get(`${this.apiUrl}/avis/avis_produit/?produit_id=${produitId}`);
  }
  supprimer(id: number) {
    return this.http.delete(`${this.apiUrl}/avis/${id}/supprimer/`);
  }
}