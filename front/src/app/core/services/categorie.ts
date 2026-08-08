import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private api = '/api/produits/categories/';

  constructor(
    private http: HttpClient
  ) {}

  getCategories(): Observable<any> {

    return this.http.get<any>(this.api).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response;
        }
        return response?.results ?? [];
      })
    );

  }

}