import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private api = '/api/commandes/panier/';
  private nombreArticlesSubject = new BehaviorSubject<number>(0);
  readonly nombreArticles$ = this.nombreArticlesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPanier(): Observable<any> {
    return this.http.get(this.api + 'mon_panier/');
  }

  ajouterProduit(produitId: number, quantite: number = 1): Observable<any> {
    return this.http.post(this.api + 'ajouter/', {
      produit_id: produitId,
      quantite
    });
  }

  ajouter(item: any): Observable<any> {
    return this.ajouterProduit(item.id, item.quantite || 1);
  }

  modifierQuantite(articleId: number, quantite: number): Observable<any> {
    return this.http.patch(this.api + 'modifier_quantite/', {
      article_id: articleId,
      quantite
    });
  }

  supprimerArticle(articleId: number): Observable<any> {
    return this.http.delete(this.api + 'supprimer_article/', { body: { article_id: articleId } });
  }

  viderPanier(): Observable<any> {
    return this.http.delete(this.api + 'vider/');
  }

  appliquerCodePromo(code: string): Observable<any> {
    return this.http.post(this.api + 'appliquer_code_promo/', {
      code_promo: code
    });
  }

  mettreAJourNombreArticles(nombre: number): void {
    this.nombreArticlesSubject.next(nombre);
  }

  chargerNombreArticles(): void {
    this.getPanier().subscribe({
      next: (panier: any) => {
        const nombre = panier?.articles?.length || 0;
        this.mettreAJourNombreArticles(nombre);
      },
      error: () => {
        this.mettreAJourNombreArticles(0);
      }
    });
  }

}