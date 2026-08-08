import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BoutiqueService, BoutiqueApi, ProduitBoutique, AvisBoutique } from '../services/boutique.service';

interface CategoryChip {
  name: string;
  count: number;
  active: boolean;
}

interface ReviewRow {
  stars: number;
  percent: number;
  count: number;
}

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique.html',
  styleUrls: ['./boutique.scss'],
})
export class Boutique implements OnInit {
  boutique: BoutiqueApi | null = null;
  produits: ProduitBoutique[] = [];
  avis: AvisBoutique[] = [];
  avisCount = 0;
  averageRating = 0;
  selectedCategory = 'Tous';
  selectedSort = 'Popularité';
  categories: CategoryChip[] = [{ name: 'Tous', count: 0, active: true }];
  avisBreakdown: ReviewRow[] = [];
  loading = true;
  error = '';
  boutiqueId = 1;

  constructor(
    private boutiqueService: BoutiqueService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.boutiqueId = Number(idParam);
      }
      this.loadBoutiqueData();
    });

    this.route.queryParamMap.subscribe((queryParams) => {
      const queryId = queryParams.get('id');
      if (queryId) {
        this.boutiqueId = Number(queryId);
        this.loadBoutiqueData();
      }
    });

    // Temporary debug fallback: if API data doesn't populate shortly, use mock data
    setTimeout(() => {
      if (!this.boutique && !this.error) {
        console.warn('Using mock boutique data for debugging display.');
        this.useMockData();
      }
    }, 600);
  }

  get filteredProducts(): ProduitBoutique[] {
    const products = this.produits.slice();

    const filtered = this.selectedCategory === 'Tous'
      ? products
      : products.filter((product) => product.categorie === this.selectedCategory);

    if (this.selectedSort === 'Popularité') {
      return filtered.sort((a, b) => b.quantite_stock - a.quantite_stock);
    }

    return filtered.sort((a, b) => b.id - a.id);
  }

  // Debug helper: inject mock data to validate template rendering
  private useMockData(): void {
    this.boutique = {
      id: this.boutiqueId,
      nom: 'Boutique Demo',
      description: 'Produits locaux démo',
      ville: 'Dakar',
      logo_url: null,
      note: 4.5,
      followers: 123,
      ventes: 45,
      total_produits: 4
    } as BoutiqueApi;

    this.produits = [
      { id: 1, nom: 'Produit A', prix: 12000, quantite_stock: 10, est_actif: true, categorie: 'Mode' },
      { id: 2, nom: 'Produit B', prix: 3200, quantite_stock: 5, est_actif: true, categorie: 'Alimentation' },
      { id: 3, nom: 'Produit C', prix: 8500, quantite_stock: 0, est_actif: false, categorie: 'Artisanat' },
    ];

    this.avis = [
      { id: 1, note: 5, commentaire: 'Très bien' },
      { id: 2, note: 4, commentaire: 'Bon produit' },
    ];

    this.updateCategories();
    this.updateReviewBreakdown();
    this.loading = false;
  }

  toggleCategory(category: CategoryChip): void {
    this.categories = this.categories.map((item) => ({
      ...item,
      active: item.name === category.name,
    }));
    this.selectedCategory = category.name;
  }

  setSort(option: string): void {
    this.selectedSort = option;
  }

  private loadBoutiqueData(): void {
    this.loading = true;
    this.error = '';

    this.boutiqueService.getBoutique(this.boutiqueId).subscribe({
      next: (boutique) => {
        this.boutique = boutique;
        this.loading = false;
        console.log('Boutique loaded in component:', boutique);
        try { this.cdr.detectChanges(); } catch(e) {}
        try { (window as any).__boutiqueLoaded = boutique; } catch(e) {}
      },
      error: (err) => {
        this.error = 'Impossible de charger la boutique.';
        this.loading = false;
        console.error(err);
        try { (window as any).__boutiqueError = String(err); } catch(e) {}
      }
    });

    this.boutiqueService.getProducts(this.boutiqueId).subscribe({
      next: (produits) => {
        this.produits = produits;
        this.updateCategories();
        try { this.cdr.detectChanges(); } catch(e) {}
        try { (window as any).__boutiqueProducts = produits; } catch(e) {}
      },
      error: (err) => {
        this.error = 'Impossible de charger les produits.';
        console.error(err);
      }
    });

    this.boutiqueService.getReviews(this.boutiqueId).subscribe({
      next: (avis) => {
        this.avis = avis;
        this.updateReviewBreakdown();
        try { this.cdr.detectChanges(); } catch(e) {}
        try { (window as any).__boutiqueReviews = avis; } catch(e) {}
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private updateCategories(): void {
    const counts = new Map<string, number>();

    this.produits.forEach((product) => {
      const category = product.categorie?.trim() || 'Autres';
      counts.set(category, (counts.get(category) ?? 0) + 1);
    });

    const categoryItems: CategoryChip[] = [
      { name: 'Tous', count: this.produits.length, active: this.selectedCategory === 'Tous' }
    ];

    counts.forEach((count, name) => {
      categoryItems.push({
        name,
        count,
        active: name === this.selectedCategory
      });
    });

    this.categories = categoryItems;
  }

  private updateReviewBreakdown(): void {
    const total = this.avis.length;
    this.avisCount = total;

    if (!total) {
      this.averageRating = 0;
      this.avisBreakdown = [
        { stars: 5, percent: 0, count: 0 },
        { stars: 4, percent: 0, count: 0 },
        { stars: 3, percent: 0, count: 0 },
        { stars: 2, percent: 0, count: 0 },
        { stars: 1, percent: 0, count: 0 },
      ];
      return;
    }

    const distribution = [5, 4, 3, 2, 1].map((stars) => {
      const count = this.avis.filter((review) => review.note === stars).length;
      return {
        stars,
        count,
        percent: Math.round((count / total) * 100)
      };
    });

    this.avisBreakdown = distribution;
    this.averageRating = parseFloat(
      (this.avis.reduce((sum, review) => sum + review.note, 0) / total).toFixed(1)
    );

    if (this.boutique) {
      this.boutique.note = this.averageRating;
    }
  }
}

