import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../core/services/auth';
import { DashboardService } from '../../core/services/dashboard.service';
import { StatsCards } from './components/stats-cards/stats-cards';
import { SalesChart } from './components/sales-chart/sales-chart';
import { RecentOrders } from './components/recent-orders/recent-orders';
import { TopProducts } from './components/top-products/top-products';
import { RecentActivity } from './components/recent-activity/recent-activity';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsCards,
    SalesChart,
    RecentOrders,
    TopProducts,
    RecentActivity
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  displayName = 'Vendeur';

  salesData: any[] = [];
  recentOrders: any[] = [];
  topProducts: any[] = [];
  activityMessages: string[] = [];
  period = 'mois';

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.displayName = this.authService.getDisplayName();
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.dashboardService.revenueChart(this.period).subscribe({
      next: (data: any) => {
        this.salesData = Array.isArray(data)
          ? data.map((item: any) => ({
              label: item.label,
              montant: item.revenue ?? item.montant ?? 0,
              commandes: item.commandes ?? 0
            }))
          : [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.salesData = [];
      }
    });

    this.dashboardService.recentOrders().subscribe({
      next: (data: any) => {
        this.recentOrders = Array.isArray(data) ? data : data.results || [];
        this.activityMessages = this.recentOrders.slice(0, 4).map((commande: any) => {
          const customer = commande.customer_username || commande.client || 'Client';
          const total = commande.total_price || commande.montant_total || '—';
          return `Nouvelle commande de ${customer} : ${total} FCFA`;
        });
      },
      error: () => {
        this.recentOrders = [];
        this.activityMessages = [];
      }
    });

    this.dashboardService.topProducts().subscribe({
      next: (data: any) => {
        const products = Array.isArray(data) ? data : data.results || [];
        this.topProducts = products.slice(0, 5);
        this.cdr.detectChanges();
      },
      error: () => {
        this.topProducts = [];
      }
    });
  }
}