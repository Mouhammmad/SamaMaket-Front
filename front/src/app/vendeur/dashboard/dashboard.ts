import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../core/services/auth';
import { DashboardService } from '../../core/services/dashboard.service';
import { StatsCards } from './components/stats-cards/stats-cards';
import { RecentOrders } from './components/recent-orders/recent-orders';
import { TopProducts } from './components/top-products/top-products';
import { MonthlyComparison } from './components/monthly-comparison/monthly-comparison';
import { CategoriesChart } from './components/categories-chart/categories-chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsCards,
    RecentOrders,
    TopProducts,
    MonthlyComparison,
    CategoriesChart
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  displayName = 'Vendeur';

  salesData: any[] = [];
  categoriesData: any[] = [];
  recentOrders: any[] = [];
  topProducts: any[] = [];
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

    this.dashboardService.salesByCategory().subscribe({
      next: (data: any) => {
        this.categoriesData = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.categoriesData = [];
      }
    });

    this.dashboardService.recentOrders().subscribe({
      next: (data: any) => {
        this.recentOrders = Array.isArray(data) ? data : data.results || [];
      },
      error: () => {
        this.recentOrders = [];
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