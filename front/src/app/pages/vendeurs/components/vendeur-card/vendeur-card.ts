import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-vendeur-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './vendeur-card.html',
  styleUrl: './vendeur-card.css'
})
export class VendeurCard {

  @Input() vendeur: any = null;

  @Output() voirBoutique =
    new EventEmitter<number>();

  constructor(
    private router: Router
  ) {}

  ouvrirBoutique(): void {

    if (!this.vendeur?.id) {
      return;
    }

    this.voirBoutique.emit(
      this.vendeur.id
    );

  }

}