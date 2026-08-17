import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../core/services/produit';
import { ProduitCard } from '../produits/catalogue/components/produit-card/produit-card';
import { Produit } from '../../core/models/produit';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [CommonModule, ProduitCard],
  templateUrl: './offres.html',
  styleUrl: './offres.css'
})
export class OffresPage implements OnInit {
  produits: Produit[] = [];
  chargement = true;
  erreur = false;

  constructor(
    private produitService: ProduitService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerPromotions();
  }

  chargerPromotions(): void {
    this.chargement = true;
    this.erreur = false;

    this.produitService.getProduits({
      page: 1,
      page_size: 24,
      ordering: '-date_creation'
    }).subscribe({
      next: (response: any) => {
        const raw = Array.isArray(response?.results)
          ? response.results
          : Array.isArray(response)
            ? response
            : response?.results || [];

        this.produits = raw.filter((produit: any) => {
          return !!produit.prix_promo || !!produit.promotion_active || !!produit.ancien_prix;
        });

        this.chargement = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.produits = [];
        this.erreur = true;
        this.chargement = false;
        this.cdr.detectChanges();
      }
    });
  }
}
