import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Boutique {

  private api = '/api/boutiques/';

  constructor(private http: HttpClient) {}

  getMaBoutique(): Observable<any> {
    return this.http.get(this.api + 'ma/');
  }

  creerBoutique(data: FormData): Observable<any> {
    return this.http.post(this.api + 'create/', data);
  }

  modifierBoutique(id: number, data: FormData): Observable<any> {
    return this.http.put(this.api + id + '/', data);
  }

}