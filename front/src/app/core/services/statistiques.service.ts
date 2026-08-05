import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {
  private http = inject(HttpClient);

  private api = '/api/dashboard-vendeur/';

  dashboard(periode: string): Observable<any> {
    return this.http.get<any>(this.api, {
      params: { periode }
    });
  }
}
