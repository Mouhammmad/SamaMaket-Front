import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class Dashboard {}