import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Commande {
  id: number;
  statut: string;
  montant_total: number;
  adresse_livraison: string;
  notes: string;
  lignes: any[];
  paiement: any;
  date_creation: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private api = '/api/commandes';

  constructor(private http: HttpClient) {}

  getMesCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.api}/commandes/mes_commandes/`);
  }

}