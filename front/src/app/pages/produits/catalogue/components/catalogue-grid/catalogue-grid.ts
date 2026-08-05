import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitCard } from '../produit-card/produit-card';

@Component({
  selector: 'app-catalogue-grid',
  standalone: true,
  imports: [
    CommonModule,
    ProduitCard
  ],
  templateUrl: './catalogue-grid.html',
  styleUrl: './catalogue-grid.css'
})
export class CatalogueGrid {

  @Input()
  produits: any[] = [];

  @Output()
  voir = new EventEmitter<any>();

  @Output()
  panier = new EventEmitter<any>();

  @Output()
  favori = new EventEmitter<any>();

}