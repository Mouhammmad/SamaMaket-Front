import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotion-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-timeline.html',
  styleUrl: './promotion-timeline.css'
})
export class PromotionTimeline {

  @Input() promotions: any[] = [];

  getEtat(promo: any): 'active' | 'future' | 'expired' {

    const today = new Date();

    const debut = new Date(promo.date_debut);

    const fin = new Date(promo.date_fin);

    if (today < debut) {

      return 'future';

    }

    if (today > fin) {

      return 'expired';

    }

    return 'active';

  }

}