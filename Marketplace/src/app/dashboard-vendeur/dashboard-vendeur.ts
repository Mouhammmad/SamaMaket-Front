import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { VendeurDashboard, VendeurStats, Produit, Commande } from '../services/vendeur-dashboard';
import { AuthService } from '../services/auth.service';
import { BoutiqueService } from '../services/boutique.service';

type DashboardSection = 'dashboard' | 'commandes' | 'produits' | 'statistiques' | 'boutique' | 'livraisons' | 'avis' | 'paiements' | 'parametres';

@Component({
  selector: 'app-dashboard-vendeur',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard-vendeur.html',
  styleUrls: ['./dashboard-vendeur.scss'],
})
export class DashboardVendeur implements OnInit {
  
  stats: VendeurStats | null = null;
  boutique: { id: number; nom: string; logo_url?: string | null } | null = null;
  produits: Produit[] = [];
  commandes: Commande[] = [];
  revenueData: Array<{label:string; revenue:number}> = [];
  revenueMax = 0;
  categories: Array<{category:string; sales:number; revenue:number}> = [];
  loading = true;
  error: string | null = null;
  selectedPeriod = 'mois';
  // UI states for creation forms
  creatingProduct = false;
  creatingBoutique = false;
  selectedProductImage: File | null = null;

  newProduct: Partial<Produit & { categorie_nom?: string }> = {
    nom: '',
    description: '',
    prix: 0,
    quantite_stock: 0,
    est_actif: true,
  };

  newBoutique: { nom: string; description: string; ville: string } = {
    nom: '',
    description: '',
    ville: ''
  };

  constructor(
    private vendeurService: VendeurDashboard,
    private authService: AuthService,
    private router: Router,
    private boutiqueService: BoutiqueService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadStats();
  }

  private loadStats(): void {
    const token = this.authService.getToken();
    if (!token) {
      this.error = 'Token manquant. Veuillez vous reconnecter.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = null;

    this.vendeurService.getStatsWithToken(token, this.selectedPeriod).subscribe({
      next: (data) => {
        this.stats = data;
        this.boutique = data.boutique || null;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Stats error:', err);
        this.error = 'Impossible de charger les statistiques du vendeur.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.vendeurService.getProductsWithToken(token).subscribe({
      next: (data) => {
        this.produits = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Products error:', err);
      }
    });

    this.vendeurService.getOrdersWithToken(token).subscribe({
      next: (data) => {
        this.commandes = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Orders error:', err);
      }
    });
  }

  onPeriodChange(period: string): void {
    this.selectedPeriod = period;
    this.vendeurService.getStatsWithToken(this.authService.getToken() || '', period).subscribe({
      next: (data) => {
        this.stats = data;
        this.loadGraphs(period);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Failed to update stats:', err);
      }
    });
  }

  private loadGraphs(period: string): void {
    const token = this.authService.getToken();
    if (!token) {
      return;
    }

    this.vendeurService.getRevenueGraph(token, period).subscribe({
      next: (data) => {
        this.revenueData = data || [];
        this.revenueMax = this.revenueData.reduce((m, i) => Math.max(m, i.revenue), 0);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Revenue graph error:', err);
      }
    });

    this.vendeurService.getSalesByCategory(token, period).subscribe({
      next: (data) => {
        this.categories = data || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Categories error:', err);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'livre':
      case 'delivered':
        return 'delivered';
      case 'en attente':
      case 'pending':
        return 'pending';
      case 'expediee':
      case 'shipped':
        return 'shipped';
      case 'annulee':
      case 'cancelled':
        return 'cancelled';
      default:
        return 'pending';
    }
  }

  getStatusLabel(status: string): string {
    switch (status?.toLowerCase()) {
      case 'livre':
      case 'delivered':
        return 'Livrée';
      case 'en attente':
      case 'pending':
        return 'En attente';
      case 'expediee':
      case 'shipped':
        return 'Expédiée';
      case 'annulee':
      case 'cancelled':
        return 'Annulée';
      default:
        return status || 'Inconnue';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  createProduct(): void {
    const token = this.authService.getToken();
    if (!token) { this.router.navigate(['/login']); return; }

    const formData = new FormData();
    formData.append('nom', this.newProduct.nom || '');
    formData.append('description', this.newProduct.description || '');
    formData.append('prix', String(this.newProduct.prix || 0));
    formData.append('quantite_stock', String(this.newProduct.quantite_stock || 0));
    formData.append('est_actif', String(!!this.newProduct.est_actif));
    formData.append('categorie_nom', this.newProduct.categorie_nom || '');
    if (this.selectedProductImage) {
      formData.append('image', this.selectedProductImage);
    }

    this.vendeurService.createProductWithToken(token, formData).subscribe({
      next: (res: any) => {
        this.produits.unshift(res);
        this.creatingProduct = false;
        this.newProduct = { nom: '', description: '', prix: 0, quantite_stock: 0, est_actif: true };
        this.selectedProductImage = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur création produit', err);
      }
    });
  }

  updateOrderStatus(order: Commande, status: string): void {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.vendeurService.updateOrderStatus(token, order.id, status).subscribe({
      next: () => {
        order.status = status;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur mise à jour commande', err)
    });
  }

  onProductImageChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedProductImage = target.files[0];
    } else {
      this.selectedProductImage = null;
    }
  }

  createBoutique(): void {
    const token = this.authService.getToken();
    if (!token) { this.router.navigate(['/login']); return; }

    this.boutiqueService.createBoutiqueWithToken(token, this.newBoutique).subscribe({
      next: (boutique: any) => {
        this.boutique = boutique;
        this.creatingBoutique = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur création boutique', err);
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/vendeur']);
  }

  goToCommandes(): void {
    this.router.navigate(['/mes-commandes']);
  }

  goToProduits(): void {
    this.router.navigate(['/produits']);
  }

  goToPaiements(): void {
    this.router.navigate(['/paiment']);
  }

  goToLivraisons(): void {
    // Pas de composant dédié pour le moment
    console.warn('Livraisons : fonctionnalité non implémentée');
  }

  goToAvis(): void {
    // Pas de composant dédié pour le moment
    console.warn('Avis clients : fonctionnalité non implémentée');
  }

  onBoutiqueClick(): void {
    if (this.boutique && this.boutique.id) {
      this.router.navigate(['/boutique', this.boutique.id]);
    } else {
      this.creatingBoutique = true;
    }
  }
}
