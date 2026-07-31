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

  @Output() modifier = new EventEmitter<any>();

  @Output() supprimer = new EventEmitter<any>();

  @Output() apercu = new EventEmitter<any>();
  @Output() dupliquer = new EventEmitter<any>();

}