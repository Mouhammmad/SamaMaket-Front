import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoriService {

  private api = '/api/produits/favoris/';

  constructor(
    private http: HttpClient
  ) {}

  getFavoris() {

    return this.http.get(this.api);

  }

  toggle(produit: number) {

    return this.http.post(

      this.api + 'toggle/',

      {

        produit

      }

    );

  }

  supprimerFavori(id: number) {

    return this.http.delete(this.api + id + '/');

  }

}