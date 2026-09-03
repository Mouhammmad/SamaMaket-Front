import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ProduitOffre,
  Promotion
} from '../../../../core/services/produit';

@Component({
  selector: 'app-offres-card',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './offres-card.html',
  styleUrl: './offres-card.css'
})
export class OffresCard {

  @Input()
  offre!: Promotion;

  @Output()
  produitClick = new EventEmitter<number>();


  // ==========================================
  // CALCUL DU PRIX PROMOTIONNEL
  // ==========================================

  prixPromotionnel(prix: string): number {

    const prixInitial = Number(prix);

    const remise = Number(
      this.offre.taux_remise
    );

    if (
      this.offre.type_remise ===
      'pourcentage'
    ) {

      return (
        prixInitial -
        (
          prixInitial *
          remise /
          100
        )
      );

    }

    return Math.max(
      0,
      prixInitial - remise
    );
  }


  // ==========================================
  // AFFICHER LA REMISE
  // ==========================================

  afficherRemise(): string {

    if (
      this.offre.type_remise ===
      'pourcentage'
    ) {

      return `-${this.offre.taux_remise}%`;

    }

    return `-${this.offre.taux_remise} FCFA`;
  }


  // ==========================================
  // VOIR LE PRODUIT
  // ==========================================

  voirProduit(
    produitId: number
  ): void {

    this.produitClick.emit(
      produitId
    );

  }


  // ==========================================
  // IMAGE
  // ==========================================

  getImage(produit: ProduitOffre): string {

    return (
      produit.image_url ||
      produit.image ||
      'assets/images/produit.png'
    );

  }

}