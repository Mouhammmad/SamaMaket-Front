import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommandeService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  validerPanier(adresse: string, methode: string) {
    return this.http.post(`${this.apiUrl}/commandes/valider_panier/`, { adresse_livraison: adresse, methode_paiement: methode });
  }
  confirmerPaiement(id: number, idTransaction: string) {
    return this.http.post(`${this.apiUrl}/commandes/${id}/confirmer_paiement/`, { id_transaction: idTransaction });
  }
  mesCommandes() {
    return this.http.get(`${this.apiUrl}/commandes/mes_commandes/`);
  }
}