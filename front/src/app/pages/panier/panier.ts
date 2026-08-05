import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PanierService } from '../../core/services/panier';
import { PanierHeader } from './components/panier-header/panier-header';
import { PanierStepper } from './components/panier-stepper/panier-stepper';
import { PanierEmpty } from './components/panier-empty/panier-empty';
import { PanierList } from './components/panier-list/panier-list';
import { PromoCode } from './components/promo-code/promo-code';
import { PanierSummary } from './components/panier-summary/panier-summary';
import { Suggestions } from './components/suggestions/suggestions';
import { CheckoutStepper } from '../../shared/checkout-stepper/checkout-stepper';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [
    CommonModule,
    PanierHeader,
    PanierStepper,
    PanierEmpty,
    PanierList,
    PromoCode,
    PanierSummary,
    Suggestions,
    CheckoutStepper
  ],
  templateUrl: './panier.html',
  styleUrl: './panier.css'
})
export class Panier implements OnInit {

  panier: any = null;

  suggestions: any[] = [];

  codePromo = '';

  sousTotal = 0;

  reduction = 0;

  livraison = 0;

  total = 0;

  constructor(
    private panierService: PanierService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.chargerPanier();

  }

  chargerPanier(): void {
    console.log('[Panier] chargement du panier');

    this.panierService.getPanier().subscribe({

      next: (data) => {
        console.log('[Panier] données reçues', data);

        this.panier = data || { articles: [] };

        this.calculerTotal();
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error('[Panier] erreur chargement panier', err);
        this.panier = { articles: [] };
        this.cdr.detectChanges();
      }

    });

  }

  calculerTotal(): void {

    if (!this.panier) {

      return;

    }

    this.sousTotal = 0;

    this.panier.articles.forEach((article: any) => {

      this.sousTotal += Number(article.sous_total);

    });

    this.total =

      this.sousTotal

      - this.reduction

      + this.livraison;

  }

  viderPanier(): void {

    this.panierService.viderPanier().subscribe({

      next: () => this.chargerPanier()

    });

  }

  augmenterQuantite(article: any): void {

    this.panierService

      .modifierQuantite(

        article.id,

        article.quantite + 1

      )

      .subscribe({

        next: () => this.chargerPanier()

      });

  }

  diminuerQuantite(article: any): void {

    if (article.quantite <= 1) {

      return;

    }

    this.panierService

      .modifierQuantite(

        article.id,

        article.quantite - 1

      )

      .subscribe({

        next: () => this.chargerPanier()

      });

  }

  supprimerArticle(article: any): void {

    this.panierService

      .supprimerArticle(article.id)

      .subscribe({

        next: () => this.chargerPanier()

      });

  }

  passerCommande(): void {

    this.router.navigate(['/checkout']);

  }

  continuerAchats(): void {

    this.router.navigate(['/produits']);

  }

  appliquerCode(code: string): void {

    console.log(code);

  }

  ajouterSuggestion(produit: any): void {

    this.panierService

      .ajouterProduit(produit.id)

      .subscribe({

        next: () => this.chargerPanier()

      });

  }

}