import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPanier() {
    return this.http.get(`${this.apiUrl}/panier/mon_panier/`);
  }

  ajouterArticle(produitId: number, quantite: number) {
    return this.http.post(`${this.apiUrl}/panier/ajouter/`, {
      produit_id: produitId,
      quantite
    });
  }

  modifierQuantite(articleId: number, quantite: number) {
    return this.http.patch(`${this.apiUrl}/panier/modifier_quantite/`, {
      article_id: articleId,
      quantite
    });
  }

  supprimerArticle(articleId: number) {
    return this.http.delete(`${this.apiUrl}/panier/supprimer_article/`, {
      body: { article_id: articleId }
    });
  }

  viderPanier() {
    return this.http.delete(`${this.apiUrl}/panier/vider/`);
  }

  appliquerPromo(code: string) {
    return this.http.post(`${this.apiUrl}/promotions/appliquer/`, { code });
  }
}