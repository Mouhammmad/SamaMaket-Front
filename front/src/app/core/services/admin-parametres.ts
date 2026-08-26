import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ParametresPlateforme {
  nom_plateforme: string;
  email_contact: string;
  description: string;
  validation_vendeurs: boolean;
  notifications_commandes: boolean;
  notifications_vendeurs: boolean;
  notifications_systeme: boolean;
}

@Injectable({ providedIn: 'root' })
export class AdminParametresService {
  private readonly apiUrl = '/api/dashboard/admin/parametres/';

  constructor(private http: HttpClient) {}

  getParametres(): Observable<ParametresPlateforme> {
    return this.http.get<ParametresPlateforme>(this.apiUrl);
  }

  sauvegarder(parametres: ParametresPlateforme): Observable<ParametresPlateforme> {
    return this.http.patch<ParametresPlateforme>(this.apiUrl, parametres);
  }
}
