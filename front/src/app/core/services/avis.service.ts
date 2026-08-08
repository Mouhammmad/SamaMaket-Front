import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  private api = 'http://127.0.0.1:8000/api/produits/avis/';

  constructor(
    private http: HttpClient
  ) {}

  getAvis(): Observable<any> {

    return this.http.get<any>(
      this.api
    );

  }

  getAvisVendeur(): Observable<any> {

    return this.http.get<any>(
      `${this.api}?vendeur=true`
    );

  }

  getAvisDetail(id: number): Observable<any> {

    return this.http.get<any>(
      `${this.api}${id}/`
    );

  }

  rechercherAvis(recherche: string): Observable<any> {

    return this.http.get<any>(
      `${this.api}?search=${recherche}`
    );

  }

  filtrerParNote(note: string): Observable<any> {

    return this.http.get<any>(
      `${this.api}?note=${note}`
    );

  }

  approuverAvis(id: number): Observable<any> {

    return this.http.patch<any>(
      `${this.api}${id}/`,
      {
        est_approuve: true
      }
    );

  }

}