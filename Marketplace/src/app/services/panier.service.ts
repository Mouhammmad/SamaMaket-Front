import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  api = '/api/commandes';

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  private toastMessageSubject = new BehaviorSubject<string>('');
  toastMessage$ = this.toastMessageSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPanier(): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      this.setCartCount([]);
      return of({ articles: [], total: 0 });
    }
    return this.http.get<any>(`${this.api}/panier/mon_panier/`).pipe(
      tap((data: any) => this.setCartCount(data.articles ?? [])),
      catchError(() => {
        this.setCartCount([]);
        return of({ articles: [] });
      })
    );
  }

  ajouter(produit: any): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      this.showToast('Veuillez vous connecter pour ajouter un produit au panier');
      return throwError(() => new Error('AUTH_REQUIRED'));
    }

    // Normaliser le payload: accepter soit un objet produit, soit un payload { produit_id, quantite }
    let payload: any;
    if (produit && produit.produit_id) {
      payload = produit;
    } else if (produit && produit.id) {
      payload = { produit_id: produit.id, quantite: produit.quantite ?? 1 };
    } else {
      payload = produit;
    }

    return this.http.post<any>(`${this.api}/panier/ajouter/`, payload).pipe(
      tap((data: any) => {
        this.setCartCount(data.articles ?? []);
        this.showToast('Produit ajouté au panier');
      }),
      catchError((err) => {
        this.showToast('Impossible d’ajouter au panier');
        return throwError(() => err);
      })
    );
  }

  modifierQuantite(articleId: number, quantite: number): Observable<any> {
    return this.http.patch<any>(`${this.api}/panier/modifier_quantite/`, { article_id: articleId, quantite }).pipe(
      tap((data: any) => this.setCartCount(data.articles ?? []))
    );
  }

  supprimer(articleId: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/panier/supprimer_article/`, {
      body: { article_id: articleId }
    }).pipe(
      tap((data: any) => this.setCartCount(data.articles ?? []))
    );
  }

  vider(): Observable<any> {
    return this.http.delete<any>(`${this.api}/panier/vider/`).pipe(
      tap(() => {
        this.setCartCount([]);
        this.showToast('Panier vidé');
      })
    );
  }

  validerCommande(adresse: string, methode: string, codePromo = ''): Observable<any> {
    return this.http.post<any>(`${this.api}/commandes/valider_panier/`, {
      adresse_livraison: adresse,
      methode_paiement: methode,
      code_promo: codePromo
    }).pipe(
      tap((data: any) => {
        this.setCartCount([]);
        this.showToast(data.message || 'Commande créée avec succès');
      })
    );
  }

  appliquerCodePromo(codePromo: string): Observable<any> {
    return this.http.post<any>(`${this.api}/panier/appliquer_code_promo/`, {
      code_promo: codePromo
    });
  }

  confirmerPaiement(commandeId: number, idTransaction: string): Observable<any> {
    return this.http.post<any>(`${this.api}/commandes/${commandeId}/confirmer_paiement/`, {
      id_transaction: idTransaction
    });
  }

  refreshCartCount(): Observable<any> {
    return this.getPanier();
  }

  private setCartCount(articles: any[]): void {
    const count = (articles || []).reduce((sum: number, article: any) => sum + (article.quantite ?? 1), 0);
    this.cartCountSubject.next(count);
  }

  private showToast(message: string): void {
    this.toastMessageSubject.next(message);
  }

}