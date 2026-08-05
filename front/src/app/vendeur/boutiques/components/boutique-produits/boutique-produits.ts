import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitCard } from '../../../../pages/produits/catalogue/components/produit-card/produit-card';

@Component({
  selector: 'app-boutique-produits',
  standalone: true,
  imports: [CommonModule, ProduitCard],
  templateUrl: './boutique-produits.html',
  styleUrl: './boutique-produits.css',
})
export class BoutiqueProduits {

  @Input()
  produits: any[] = [];

}
