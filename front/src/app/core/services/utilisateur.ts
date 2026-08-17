import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private api = '/api/comptes/';

  constructor(private http: HttpClient) {}

  getProfil(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.api + 'profil/mon_profil/');
  }

  modifierProfil(data: Utilisateur): Observable<Utilisateur> {
    const payload = {
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      notif_commandes: (data as any).notif_commandes,
      notif_promos: (data as any).notif_promos,
      notif_favoris: (data as any).notif_favoris,
      notif_newsletter: (data as any).notif_newsletter
    };
    return this.http.patch<Utilisateur>(
      this.api + 'profil/modifier/',
      payload
    );
  }

  changerMotDePasse(data: { ancien_mot_de_passe: string; nouveau_mot_de_passe: string }): Observable<any> {
    return this.http.post<any>(
      this.api + 'profil/changer_mot_de_passe/',
      data
    );
  }

}