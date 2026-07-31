import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotion-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-preview.html',
  styleUrl: './promotion-preview.css'
})
export class PromotionPreview {

  @Input() promotion: any;

  @Output() fermer = new EventEmitter<void>();

  getProduitImage(produit: any): string {
    return produit?.image_url || produit?.image || 'assets/images/default-product.png';
  }

  calculerPrixPromo(produit: any): number {

  const prix = Number(produit.prix);

  if (this.promotion.type_remise === 'pourcentage') {

    return prix -

      (prix * this.promotion.taux_remise / 100);

  }

  return Math.max(

    prix - this.promotion.taux_remise,

    0

  );

}

}