import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produit-header.html',
  styleUrl: './produit-header.css',
})
export class ProduitHeader {
  @Output() addProduct = new EventEmitter<void>();

  ouvrir(): void {
    this.addProduct.emit();
  }
}