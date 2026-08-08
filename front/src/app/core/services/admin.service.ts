import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private api = 'http://127.0.0.1:8000/api/admin/';

  constructor(private http: HttpClient) {}

  getUtilisateurs(search = ''): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}utilisateurs/?search=${search}`);
  }

  getUtilisateur(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}utilisateurs/${id}/`);
  }

  suspendreUtilisateur(id: number): Observable<any> {
    return this.http.patch(`${this.api}utilisateurs/${id}/gestion/`, { action: 'suspendre' });
  }

  reactiverUtilisateur(id: number): Observable<any> {
    return this.http.patch(`${this.api}utilisateurs/${id}/gestion/`, { action: 'reactiver' });
  }

  supprimerUtilisateur(id: number): Observable<any> {
    return this.http.delete(`${this.api}utilisateurs/${id}/gestion/`);
  }

  getBoutiques(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}boutiques/`);
  }

  validerBoutique(id: number, approve: boolean): Observable<any> {
    return this.http.post(`${this.api}vendeur_en_attente/`, { boutique_id: id, approve });
  }

  getBoutique(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}boutiques/${id}/`);
  }

}