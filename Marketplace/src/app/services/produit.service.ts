export {};

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  api="/api";

  constructor(private http:HttpClient){}

  getProduits(){

    return this.http.get<any[]>(`${this.api}/produits/`);

  }

  getProduit(id:number){

    return this.http.get(`${this.api}/produits/${id}/`);

  }

}