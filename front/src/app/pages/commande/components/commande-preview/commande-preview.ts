import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationSummary } from '../../../confirmation/components/confirmation-summary/confirmation-summary';
import { ConfirmationProducts } from '../../../confirmation/components/confirmation-products/confirmation-products';
import { ConfirmationTracking } from '../../../confirmation/components/confirmation-tracking/confirmation-tracking';

@Component({
  selector: 'app-commande-preview',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmationSummary,
    ConfirmationProducts,
    ConfirmationTracking
  ],
  templateUrl: './commande-preview.html',
  styleUrl: './commande-preview.css'
})
export class CommandePreview {

  @Input()
  commande: any;

  @Output()
  fermer = new EventEmitter<void>();

  telechargerFacture(): void {

    console.log('Télécharger la facture');

  }

}