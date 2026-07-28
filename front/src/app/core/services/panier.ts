import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PanierItem } from '../models/panier';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  panier: PanierItem[] = [];

  private nombreArticles = new BehaviorSubject<number>(0);
  nombreArticles$ = this.nombreArticles.asObservable();

  constructor() {

    const data = localStorage.getItem('panier');

    if (data) {
      this.panier = JSON.parse(data);
    }

    this.mettreAJourCompteur();

  }

  private sauvegarder() {

    localStorage.setItem(
      'panier',
      JSON.stringify(this.panier)
    );

  }

  private mettreAJourCompteur() {

    this.nombreArticles.next(this.getNombreArticles());

  }

  ajouter(produit: PanierItem) {

    const existe = this.panier.find(
      p => p.produitId === produit.produitId
    );

    if (existe) {
      existe.quantite++;
    } else {
      this.panier.push(produit);
    }

    this.sauvegarder();
    this.mettreAJourCompteur();

  }

  getPanier() {
    return this.panier;
  }

  augmenter(id: number) {

    const produit = this.panier.find(
      p => p.produitId === id
    );

    if (produit) {
      produit.quantite++;
    }

    this.sauvegarder();
    this.mettreAJourCompteur();

  }

  diminuer(id: number) {

    const produit = this.panier.find(
      p => p.produitId === id
    );

    if (!produit) return;

    produit.quantite--;

    if (produit.quantite <= 0) {
      this.supprimer(id);
      return;
    }

    this.sauvegarder();
    this.mettreAJourCompteur();

  }

  supprimer(id: number) {

    this.panier = this.panier.filter(
      p => p.produitId !== id
    );

    this.sauvegarder();
    this.mettreAJourCompteur();

  }

  viderPanier() {

    this.panier = [];

    this.sauvegarder();
    this.mettreAJourCompteur();

  }

  getNombreArticles(): number {

    return this.panier.reduce(
      (total, item) => total + item.quantite,
      0
    );

  }

}