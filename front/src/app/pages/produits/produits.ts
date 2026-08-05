import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Catalogue } from './catalogue/catalogue';
import { ProduitCard } from './catalogue/components/produit-card/produit-card';
import { VendeurProduits } from '../../core/services/vendeur-produits';
import { Produit } from '../../core/models/produit';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, Catalogue, ProduitCard],
  templateUrl: './produits.html',
  styleUrl: './produits.css'
})
export class Produits implements OnInit {

  produitsVendeurs: Produit[] = [];
  chargementVendeurs = false;

  constructor(
    private vendeurProduitsService: VendeurProduits,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerProduitsVendeurs();
  }

  chargerProduitsVendeurs(): void {
    this.chargementVendeurs = true;

    this.vendeurProduitsService.getProduits().subscribe({
      next: (response: any) => {
        this.produitsVendeurs = Array.isArray(response?.results)
          ? response.results
          : Array.isArray(response)
            ? response
            : [];
        this.chargementVendeurs = false;
      },
      error: () => {
        this.produitsVendeurs = [];
        this.chargementVendeurs = false;
      }
    });
  }

  voirProduit(id: number): void {
    this.router.navigate(['/produit', id]);
  }

  ajouterAuPanier(id: number): void {
    console.log('Produit ajouté au panier', id);
  }

  toggleFavori(id: number): void {
    console.log('Favori togglé', id);
  }
}
