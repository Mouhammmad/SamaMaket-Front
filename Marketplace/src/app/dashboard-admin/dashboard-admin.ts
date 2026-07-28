import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAdminService, DashboardStats, Vendeur, Utilisateur } from '../services/dashboard-admin.service';
import { AuthService } from '../services/auth.service';

type AdminTab = 'overview' | 'vendeurs' | 'utilisateurs' | 'produits' | 'commandes' | 'rapports';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.scss']
})
export class DashboardAdmin implements OnInit {

  stats: DashboardStats | null = null;
  vendeurs: Vendeur[] = [];
  utilisateurs: Utilisateur[] = [];
  loading = true;
  error: string | null = null;
  activeTab: AdminTab = 'overview';
  tabs: { key: AdminTab; label: string }[] = [
    { key: 'overview', label: 'Vue d’ensemble' },
    { key: 'vendeurs', label: 'Vendeurs' },
    { key: 'utilisateurs', label: 'Utilisateurs' },
    { key: 'produits', label: 'Produits' },
    { key: 'commandes', label: 'Commandes' },
    { key: 'rapports', label: 'Rapports' }
  ];

  constructor(
    private dashboardService: DashboardAdminService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('🏗️ DashboardAdmin component created');
  }

  ngOnInit(): void {
    const token = this.authService.getStoredToken();
    if (token) {
      this.loadStats();
    } else {
      this.error = 'Veuillez vous connecter avec un compte administrateur.';
      this.loading = false;
    }
  }

  setActiveTab(tab: AdminTab): void {
    this.activeTab = tab;
  }

  /**
   * Load dashboard statistics
   */
  private loadStats(): void {
    this.loading = true;
    this.error = null;

    const token = this.authService.getStoredToken();
    if (!token) {
      this.error = 'Aucun token d’authentification trouvé.';
      this.loading = false;
      return;
    }

    this.dashboardService.getStatsWithToken(token).subscribe({
      next: (data) => {
        this.stats = data;
        this.loadVendeurs(token);
        this.loadUtilisateurs(token);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err?.error?.detail || err?.message || 'Impossible de charger les statistiques';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Load pending vendors
   */
  private loadVendeurs(token: string): void {
    this.dashboardService.getVendorsWithToken(token).subscribe({
      next: (data) => {
        this.vendeurs = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.vendeurs = [];
      }
    });
  }

  /**
   * Load recent users
   */
  private loadUtilisateurs(token: string): void {
    this.dashboardService.getRecentUsersWithToken(token).subscribe({
      next: (data) => {
        this.utilisateurs = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.utilisateurs = [];
      }
    });
  }

  /**
   * Logout
   */
  approuverVendeur(vendeur: Vendeur): void {
    const token = this.authService.getStoredToken();
    if (!token) {
      return;
    }

    this.dashboardService.approuverVendeur(token, vendeur.id, true).subscribe({
      next: () => {
        vendeur.apprové = true;
        this.vendeurs = this.vendeurs.filter((item) => item.id !== vendeur.id);
      }
    });
  }

  refuserVendeur(vendeur: Vendeur): void {
    const token = this.authService.getStoredToken();
    if (!token) {
      return;
    }

    this.dashboardService.approuverVendeur(token, vendeur.id, false).subscribe({
      next: () => {
        this.vendeurs = this.vendeurs.filter((item) => item.id !== vendeur.id);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.stats = null;
    this.vendeurs = [];
    this.utilisateurs = [];
  }
}