import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProduitService } from '../../../../core/services/produit';
import { Produit } from '../../../../core/models/produit';
import { CarteProduit } from '../../../../shared/carte-produit/carte-produit';

@Component({
  selector: 'app-futur-produits',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CarteProduit
  ],
  templateUrl: './futur-produits.html',
  styleUrl: './futur-produits.css'
})
export class FuturProduits implements OnInit {

  produits: Produit[] = [];

  estEnChargement = true;

  constructor(
    private produitService: ProduitService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.produitService.getProducts().subscribe({
      next: (data) => {
        const payload = Array.isArray(data) ? data : (data as { results?: Produit[] })?.results ?? [];
        this.produits = payload.slice(0, 6);
        this.estEnChargement = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.estEnChargement = false;
      }
    });
  }

}