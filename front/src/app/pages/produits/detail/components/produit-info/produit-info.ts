import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produit-info.html',
  styleUrl: './produit-info.css'
})
export class ProduitInfo {

  @Input()
  produit: any;

  get stock(): number {
    return Number(this.produit?.quantite_stock ?? 0);
  }

  get prixActuel(): number {
    return Number(this.produit?.prix_promo ?? this.produit?.prix ?? 0);
  }

  get prixAvant(): number {
    return Number(this.produit?.prix ?? this.produit?.prix_promo ?? 0);
  }

  get hasPromo(): boolean {
    return !!this.produit?.promotion_active || !!this.produit?.prix_promo;
  }

  get reduction(): number {
    if (!this.hasPromo || this.prixAvant <= 0) {
      return 0;
    }

    const reduction = ((this.prixAvant - this.prixActuel) / this.prixAvant) * 100;
    return Math.round(reduction);
  }

}