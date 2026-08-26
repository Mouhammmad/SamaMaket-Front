import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StatistiquesAdmin {
  utilisateurs_total: number;
  nouveaux_utilisateurs_ce_mois: number;

  vendeurs_actifs: number;
  vendeurs_en_attente: number;

  produits_total: number;

  commandes_total: number;
  commandes_du_jour: number;
  commandes_ce_mois: number;
  commandes_mois_precedent: number;
  commandes_change_pct: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class AdminStatistiquesService {

  private apiUrl = '/api/dashboard/admin/stats/';

  constructor(
    private http: HttpClient
  ) {}

  getStatistiques(periode = 'ce_mois'): Observable<StatistiquesAdmin> {

    return this.http.get<StatistiquesAdmin>(this.apiUrl, {
      params: { periode }
    });

  }
}