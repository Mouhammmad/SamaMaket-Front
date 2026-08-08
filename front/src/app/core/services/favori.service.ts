import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoriService {

  private api = 'http://127.0.0.1:8000/api/favoris/';

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

}