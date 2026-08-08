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

export interface NotificationItem {
  id: number;
  commande: number | null;
  titre: string;
  message: string;
  type: string;
  est_lu: boolean;
  sms_envoye: boolean;
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

  getNotifications(): Observable<NotificationItem[]> {
    return this.http.get<NotificationItem[]>(`${this.api}/notifications/`);
  }

  markNotificationsRead(): Observable<any> {
    return this.http.post<any>(`${this.api}/marquer_toutes_lues/`, {});
  }

}