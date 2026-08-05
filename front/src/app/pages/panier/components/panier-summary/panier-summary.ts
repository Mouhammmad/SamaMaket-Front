import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier-summary.html',
  styleUrl: './panier-summary.css'
})
export class PanierSummary {

  @Input() sousTotal = 0;

  @Input() reduction = 0;

  @Input() codePromo = '';

  @Input() livraison = 0;

  @Input() total = 0;

  @Output() commander = new EventEmitter<void>();

  @Output() continuer = new EventEmitter<void>();
@Input() titreBouton = 'Passer la commande';

@Input() afficherContinuer = true;

@Input() afficherCodePromo = true;
}