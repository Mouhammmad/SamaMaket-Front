import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private api = 'http://127.0.0.1:8000/api/utilisateur/';

  constructor(private http: HttpClient) {}

  getProfil(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.api + 'profil/');
  }

  modifierProfil(data: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(
      this.api + 'profil/',
      data
    );
  }

}