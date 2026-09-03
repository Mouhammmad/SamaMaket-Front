import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotion-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-table.html',
  styleUrl: './promotion-table.css'
})
export class PromotionTable {

  @Input() promotions: any[] = [];

  estPromotionActive(promotion: any): boolean {
    const valeur = promotion?.est_active ?? promotion?.est_actif;
    const dateFin = promotion?.date_fin
      ? new Date(`${promotion.date_fin}T23:59:59`).getTime()
      : Number.POSITIVE_INFINITY;
    const periodeValide = dateFin >= Date.now();

    if (typeof valeur === 'boolean') {
      return valeur && periodeValide;
    }

    if (typeof valeur === 'string') {
      return ['true', '1', 'yes', 'oui', 'active'].includes(valeur.toLowerCase()) && periodeValide;
    }

    if (typeof valeur === 'number') {
      return valeur === 1 && periodeValide;
    }

    return Boolean(valeur) && periodeValide;
  }

  @Output() modifier = new EventEmitter<any>();

  @Output() supprimer = new EventEmitter<any>();

  @Output() apercu = new EventEmitter<any>();
  @Output() dupliquer = new EventEmitter<any>();

}