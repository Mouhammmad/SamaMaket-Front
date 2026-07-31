import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.css',
})
export class StatsCards implements OnInit {
  displayName = 'Vendeur';

  commandes = 0;
  produits = 0;
  ventes = '0 FCFA';
  note = '0 ★';
  loading = true;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.displayName = this.authService.getDisplayName();
    this.chargerStats();
  }

  chargerStats(): void {
    this.http.get<any>('/api/dashboard/vendeur/stats/').subscribe({
      next: (data) => {
        this.commandes = data?.orders ?? 0;
        this.produits = data?.products ?? 0;
        this.ventes = this.formatCurrency(data?.revenue ?? 0);
        this.note = `${Number(data?.rating ?? 0).toFixed(1)} ★`;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  private formatCurrency(value: number): string {
    return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value)} FCFA`;
  }
}
