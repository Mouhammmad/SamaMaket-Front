import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categorie } from '../models/categorie';
import { toApiUrl } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private api = toApiUrl('/api/produits/categories/');

  constructor(
    private http: HttpClient
  ) {}

  getCategories(): Observable<any> {

    return this.http.get<any>(this.api).pipe(
      map((response) => {
        const categories = Array.isArray(response)
          ? response
          : response?.results ?? [];

        return categories.filter(
          (categorie: Categorie) => categorie.nom?.trim().toLowerCase() !== 'categorie test'
        );
      })
    );

  }

  creerCategorie(nom: string): Observable<Categorie> {
    return this.http.post<Categorie>(this.api, { nom });
  }

}