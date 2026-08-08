import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendeur-attente-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendeur-attente-card.html',
  styleUrl: './vendeur-attente-card.css'
})
export class VendeurAttenteCard {

  @Input() vendeur: any;

  @Output() approuver = new EventEmitter<number>();

  @Output() refuser = new EventEmitter<number>();

}