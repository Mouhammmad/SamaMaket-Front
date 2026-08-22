import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendeurProduits {

  private apiUrl = '/api/produits/vendeur/produits/';

  constructor(private http: HttpClient) {}

  ajouterProduit(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  getProduits(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  modifierProduit(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, formData);
  }

  changerStatutProduit(id: number, estActif: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('est_actif', estActif ? 'true' : 'false');

    return this.http.patch(`${this.apiUrl}${id}/`, formData);
  }

  supprimerProduit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

}
