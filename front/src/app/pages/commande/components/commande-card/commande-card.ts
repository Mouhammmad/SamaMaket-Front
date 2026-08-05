import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commande-card.html',
  styleUrl: './commande-card.css'
})
export class CommandeCard {

  @Input()
  commande: any;

  @Output()
  voir = new EventEmitter<any>();

  getPremierProduit() {

    return this.commande?.lignes?.[0]?.produit;

  }

  getImage() {

    const produit = this.getPremierProduit();

    return (
      produit?.image_url ||
      produit?.image ||
      'assets/images/default-product.png'
    );

  }

}