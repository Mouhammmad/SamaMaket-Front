import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccueilService } from '../services/accueil.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.scss'],
})
export class Accueil implements OnInit {
  categories: any[] = [];
  featuredProducts: any[] = [];
  sellers: any[] = [];
  newProducts: any[] = [];
  
  loadingCategories = false;
  loadingFeatured = false;
  loadingSellers = false;
  loadingNew = false;

  Math = Math;

  constructor(
    private accueilService: AccueilService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.loadDynamicData();
  }

  ajouterAuPanier(produit: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const payload = {
      produit_id: produit.id,
      quantite: 1
    };
    this.panierService.ajouter(payload).subscribe({
      next: () => console.log('Produit ajouté au panier'),
      error: (err) => console.error('Erreur ajout panier', err)
    });
  }

  private loadDynamicData(): void {
    // Load categories
    this.loadingCategories = true;
    this.accueilService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map(c => ({
          title: c.nom,
          icon: c.icon || '📦',
          color: c.color || '#f0f0f0'
        }));
        this.loadingCategories = false;
      },
      error: (err) => {
        console.warn('Categories loading failed, using fallback', err);
        this.categories = [
          { title: 'Mode & Tissu', icon: '🧵', color: '#fdf3e8' },
          { title: 'Électronique', icon: '💡', color: '#e8effd' },
          { title: 'Alimentation', icon: '🍯', color: '#edf8ec' },
          { title: 'Beauté', icon: '💄', color: '#f9ecfb' },
          { title: 'Artisanat', icon: '🪡', color: '#f3f0ff' },
          { title: 'Maison', icon: '🏠', color: '#ecf9ff' },
        ];
        this.loadingCategories = false;
      }
    });

    // Load featured products
    this.loadingFeatured = true;
    this.accueilService.getProduittsVedettes().subscribe({
      next: (data) => {
        this.featuredProducts = data.map(p => ({
          title: p.nom,
          vendor: p.boutique?.nom || 'Vendeur',
          price: `${p.prix} F`,
          oldPrice: p.ancien_prix ? `${p.ancien_prix} F` : '',
          badge: (p.note && p.note >= 4.5) ? '★ Vedette' : 'Nouveau',
          color: '#fdf7ef',
          id: p.id,
          rating: p.note || 0,
          reviews: p.nombre_avis || 0
        }));
        this.loadingFeatured = false;
      },
      error: (err) => {
        console.warn('Featured products loading failed', err);
        this.loadingFeatured = false;
      }
    });

    // Load sellers
    this.loadingSellers = true;
    this.accueilService.getVendeurspopulaires().subscribe({
      next: (data) => {
        this.sellers = data.map(b => ({
          name: b.nom,
          category: b.description || 'Boutique',
          products: b.nombre_produits || 0,
          verified: b.apprové,
          rating: b.note || 0,
          id: b.id
        }));
        this.loadingSellers = false;
      },
      error: (err) => {
        console.warn('Sellers loading failed', err);
        this.loadingSellers = false;
      }
    });

    // Load new products
    this.loadingNew = true;
    this.accueilService.getNouveauxProduits().subscribe({
      next: (data) => {
        this.newProducts = data.map(p => ({
          title: p.nom,
          vendor: p.boutique?.nom || 'Vendeur',
          price: `${p.prix} F`,
          badge: 'Nouveau',
          color: '#fdf4e6',
          id: p.id,
          rating: p.note || 0,
          reviews: p.nombre_avis || 0
        }));
        this.loadingNew = false;
      },
      error: (err) => {
        console.warn('New products loading failed', err);
        this.loadingNew = false;
      }
    });
  }
}

