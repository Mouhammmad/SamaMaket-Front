import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-produit-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit-table.html',
  styleUrl: './produit-table.css',
})
export class ProduitTable {
  @Input() produits: any[] = [];

  
}
