import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achat-rapide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achat-rapide.html',
  styleUrl: './achat-rapide.css'
})
export class AchatRapide {

  @Input()
  produit: any;

  @Output()
  ajouterPanier = new EventEmitter<any>();

  @Output()
  acheterMaintenant = new EventEmitter<any>();

  @Output()
  ajouterFavori = new EventEmitter<any>();

  quantite = 1;

  get stock(): number {
    return Number(this.produit?.quantite_stock ?? 0);
  }

  get prixTotal(): number {
    const prixUnitaire = Number(this.produit?.prix_promo ?? this.produit?.prix ?? 0);
    return prixUnitaire * this.quantite;
  }

  diminuer(): void {

    if (this.quantite > 1) {

      this.quantite--;

    }

  }

  augmenter(): void {

    if (!this.stock || this.quantite >= this.stock) {

      return;

    }

    this.quantite++;

  }

  ajouter(): void {

    this.ajouterPanier.emit({

      produit: this.produit,

      quantite: this.quantite

    });

  }

  acheter(): void {

    this.acheterMaintenant.emit({

      produit: this.produit,

      quantite: this.quantite

    });

  }

  favori(): void {

    this.ajouterFavori.emit(this.produit);

  }

}