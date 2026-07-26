import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LivraisonService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  creer(commandeId: number, datePrevue: string) {
    return this.http.post(`${this.apiUrl}/livraisons/creer/`, { commande_id: commandeId, date_prevue: datePrevue });
  }
  suivre(numeroSuivi: string) {
    return this.http.get(`${this.apiUrl}/livraisons/suivre/?numero_suivi=${numeroSuivi}`);
  }
  mettreAJourStatut(id: number, statut: string) {
    return this.http.patch(`${this.apiUrl}/livraisons/${id}/mettre_a_jour_statut/`, { statut });
  }
}