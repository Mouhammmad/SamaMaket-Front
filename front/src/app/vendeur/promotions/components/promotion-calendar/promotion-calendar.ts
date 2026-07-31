import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotion-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-calendar.html',
  styleUrl: './promotion-calendar.css'
})
export class PromotionCalendar {

  @Input() promotions: any[] = [];

  getEtat(promo: any): 'en-cours' | 'a-venir' | 'terminee' {

  const aujourdHui = new Date();
  const debut = new Date(promo.date_debut);
  const fin = new Date(promo.date_fin);

  if (aujourdHui < debut) {
    return 'a-venir';
  }

  if (aujourdHui > fin) {
    return 'terminee';
  }

  return 'en-cours';
}

}