import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 export interface Categorie {
    id: number;
    nom: string;
    count?: number;
 }

 export interface Produit {
    id: number;
    nom: string;
    prix: number;
    categorie: Categorie;
 }

 export interface  LigneCommande {

 }

 export interface Commande {
    id: number;
    client: number;
    cree_le: string;
    statut: string;
    total: number | string;
    lignes: LigneCommande[];
 } 

 
@Injectable({
    providedIn: 'root'
})
export class DataService {
    private apiCategoriesUrl = 'http://127.0.0.1:8000/categories/';
    private apiProduitsUrl = 'http://127.0.0.1:8000/produits/';
    private apiCommandesUrl = 'http://127.0.0.1:8000/commandes/';

    constructor(private http: HttpClient) {}
    
    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(this.apiCategoriesUrl)
    }

    // Méthode pour récupérer les données
    getProduits(): Observable<any[]> {
        return this.http.get<any[]>(this.apiProduitsUrl);
    }

    //Méthode pour récupérer les données
    getCommandes(): Observable<any[]> {
        return this.http.get<any[]>(this.apiCommandesUrl);
    }
}
