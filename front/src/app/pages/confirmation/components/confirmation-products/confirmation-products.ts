import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-products.html',
  styleUrl: './confirmation-products.css'
})
export class ConfirmationProducts {

  @Input()
  lignes: any[] = [];

  getImage(ligne: any): string {

    return (
      ligne.produit?.image_url ||
      ligne.produit?.image ||
      'assets/images/default-product.png'
    );

  }

}