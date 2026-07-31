import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotion-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-dashboard.html',
  styleUrl: './promotion-dashboard.css'
})
export class PromotionDashboard {

  @Input() promotions: any[] = [];

  private estPromotionActive(promotion: any): boolean {
    const valeur = promotion?.est_active ?? promotion?.est_actif;

    if (typeof valeur === 'boolean') {
      return valeur;
    }

    if (typeof valeur === 'string') {
      return ['true', '1', 'yes', 'oui', 'active'].includes(valeur.toLowerCase());
    }

    if (typeof valeur === 'number') {
      return valeur === 1;
    }

    return Boolean(valeur);
  }

  get promotionsActives(): number {
    return this.promotions.filter(p => this.estPromotionActive(p)).length;
  }

  get promotionsInactives(): number {
    return this.promotions.filter(p => !this.estPromotionActive(p)).length;
  }

  get totalProduits(): number {
    return this.promotions.reduce(
      (total, promo) => total + (promo.produits?.length || 0),
      0
    );
  }

  get promotionsExpireBientot(): number {

    const aujourdHui = new Date();

    const dans7Jours = new Date();

    dans7Jours.setDate(aujourdHui.getDate() + 7);

    return this.promotions.filter(p => {

      const fin = new Date(p.date_fin);

      return fin >= aujourdHui && fin <= dans7Jours;

    }).length;

  }
get promotionsUrgentes() {

  const aujourdHui = new Date();

  const dansTroisJours = new Date();

  dansTroisJours.setDate(aujourdHui.getDate() + 3);

  return this.promotions.filter(p => {

    if (!this.estPromotionActive(p)) {

      return false;

    }

    const fin = new Date(p.date_fin);

    return fin >= aujourdHui && fin <= dansTroisJours;

  });

}
}