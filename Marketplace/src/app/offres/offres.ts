import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketService, PromotionItem } from '../services/market.service';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offres.html',
  styleUrls: ['./offres.scss']
})
export class Offres implements OnInit {
  promotions: PromotionItem[] = [];
  loading = true;
  error = '';

  constructor(private marketService: MarketService) {}

  ngOnInit(): void {
    this.marketService.getPromotions().subscribe({
      next: (data) => {
        this.promotions = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les offres.';
        this.loading = false;
      }
    });
  }
}
