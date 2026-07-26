import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfilService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProfil() {
    return this.http.get(`${this.apiUrl}/profil/mon_profil/`);
  }
  modifier(data: any) {
    return this.http.patch(`${this.apiUrl}/profil/modifier/`, data);
  }
  changerMotDePasse(ancien: string, nouveau: string) {
    return this.http.post(`${this.apiUrl}/profil/changer_mot_de_passe/`, { ancien_mot_de_passe: ancien, nouveau_mot_de_passe: nouveau });
  }
}