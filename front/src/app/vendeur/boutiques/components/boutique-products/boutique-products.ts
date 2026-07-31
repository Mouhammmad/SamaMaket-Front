import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique-products.html',
  styleUrls: ['./boutique-products.css']
})
export class BoutiqueProducts implements OnChanges {

  @Input() produits: any[] = [];
  @Input() chargementProduits = false;

  isLoading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chargementProduits']) {
      this.isLoading = this.chargementProduits;
    }
  }

}