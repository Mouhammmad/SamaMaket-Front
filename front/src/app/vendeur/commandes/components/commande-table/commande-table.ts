import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commande-table.html',
  styleUrl: './commande-table.css'
})
export class CommandeTable {

  @Input() commandes: any[] = [];

  @Output() apercu = new EventEmitter<any>();

  @Output() statut = new EventEmitter<any>();

  @Output() facture = new EventEmitter<any>();

  @Output() supprimer = new EventEmitter<any>();

}