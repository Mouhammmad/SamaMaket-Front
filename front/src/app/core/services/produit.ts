import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private http = inject(HttpClient);

  private api = '/api/produits/';

  getProduits(params?: any): Observable<any> {

    let httpParams = new HttpParams();

    if (params) {

      Object.keys(params).forEach(key => {

        if (
          params[key] !== null &&
          params[key] !== undefined &&
          params[key] !== ''
        ) {

          httpParams = httpParams.set(key, params[key]);

        }

      });

    }

    return this.http.get<any>(
      this.api,
      {
        params: httpParams
      }
    );

  }

  getProduit(id:number):Observable<any>{

    return this.http.get<any>(`${this.api}${id}/`);

  }
rechercher(texte: string) {

    return this.http.get<any>(

        this.api,

        {

            params: {

                recherche: texte

            }

        }

    );

}

}