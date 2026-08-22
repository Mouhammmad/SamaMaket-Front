import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProduitService } from '../../../../core/services/produit';
import { ProduitCard } from '../../../produits/catalogue/components/produit-card/produit-card';

@Component({
  selector: 'app-nouveau-produits',
  standalone: true,
  imports: [CommonModule, RouterModule, ProduitCard],
  templateUrl: './nouveau-produits.html',
  styleUrl: './nouveau-produits.css',
})
export class NouveauProduits implements OnInit {
  produits: any[] = [];
  chargement = true;

  constructor(
    private produitService: ProduitService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(): void {
    this.chargement = true;

    this.produitService.getProduits({
      page: 1,
      page_size: 8,
      ordering: '-date_creation'
    }).subscribe({
      next: (response: any) => {
        this.produits = response?.results || [];
        this.chargement = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.produits = [];
        this.chargement = false;
      }
    });
  }
}
