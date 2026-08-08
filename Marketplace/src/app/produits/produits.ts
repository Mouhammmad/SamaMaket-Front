import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { PanierService } from '../services/panier.service';
import { FavorisService } from '../services/favoris.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produits.html',
  styleUrls: ['./produits.scss']
})
export class ProduitsComponent implements OnInit {

  produits: any[] = [];
  filteredProducts: any[] = [];
  categories = [
    { name: 'Tous', count: 0, active: true },
    { name: 'Mode', count: 0, active: false },
    { name: 'Accessoires', count: 0, active: false },
    { name: 'Tissu', count: 0, active: false }
  ];
  boutique: any = {
    nom: 'Couture Moderne Dakar',
    ville: 'Dakar, Sénégal',
    followers: 1240,
    logo_url: 'assets/images/shop.png'
  };
  averageRating = 4.8;
  avisCount = 56;
  selectedSort = 'Popularité';

  constructor(
    private produitService: ProduitService,
    private panierService: PanierService,
    private favorisService: FavorisService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => {
        this.produits = (data || []).map((p: any) => ({
          id: p.id,
          nom: p.nom || p.name,
          prix: p.prix || p.price || 0,
          image_url: p.image || p.image_url || '',
          boutique: p.boutique || p.boutique_name || 'Couture Moderne Dakar',
          quantite_stock: p.quantite_stock ?? p.stock ?? 0,
          categorie: p.categorie || 'Mode',
          promo: p.quantite_stock < 5,
          note: p.note || 4,
          avis_count: p.avis_count || p.reviews_count || 0,
          ...p
        }));

        const totalByCategory = this.produits.reduce((acc: any, produit: any) => {
          const cat = produit.categorie || 'Mode';
          acc[cat] = (acc[cat] || 0) + 1;
          return acc;
        }, {});

        this.categories = this.categories.map((cat) => ({
          ...cat,
          count: cat.name === 'Tous' ? this.produits.length : totalByCategory[cat.name] || 0
        }));

        this.filteredProducts = [...this.produits];
        this.applySort();

        try {
          this.cdr.detectChanges();
        } catch (e) {}
      }
    });
  }

  toggleCategory(category: any): void {
    if (category.name === 'Tous') {
      this.categories = this.categories.map((cat) => ({ ...cat, active: cat.name === 'Tous' }));
    } else {
      this.categories = this.categories.map((cat) => ({
        ...cat,
        active: cat.name === 'Tous' ? false : cat.name === category.name ? !cat.active : cat.active
      }));
      if (!this.categories.some((cat) => cat.active && cat.name !== 'Tous')) {
        this.categories = this.categories.map((cat) => ({ ...cat, active: cat.name === 'Tous' }));
      }
    }
    this.applyFilters();
  }

  setSort(value: string): void {
    this.selectedSort = value;
    this.applySort();
  }

  applyFilters(): void {
    const selectedCategories = this.categories.filter((cat) => cat.active && cat.name !== 'Tous').map((cat) => cat.name);
    this.filteredProducts = this.produits.filter((produit) => {
      if (selectedCategories.length && !selectedCategories.includes(produit.categorie)) {
        return false;
      }
      return true;
    });
    if (!this.filteredProducts.length) {
      this.filteredProducts = [...this.produits];
    }
    this.applySort();
  }

  applySort(): void {
    this.filteredProducts.sort((a: any, b: any) => {
      if (this.selectedSort === 'Plus récent') {
        return (b.id || 0) - (a.id || 0);
      }
      return +(b.prix || 0) - +(a.prix || 0);
    });
  }

  ajouterAuPanier(produit: any): void {
    const payload = {
      produit_id: produit.id,
      quantite: 1
    };

    this.panierService.ajouter(payload).subscribe({
      next: () => console.log('Produit ajouté au panier'),
      error: (err) => console.error(err)
    });
  }

  ajouterAuxFavoris(produit: any): void {
    this.favorisService.ajouterFavori(produit.id).subscribe({
      next: () => console.log('Produit ajouté aux favoris'),
      error: (err) => console.error(err)
    });
  }

}