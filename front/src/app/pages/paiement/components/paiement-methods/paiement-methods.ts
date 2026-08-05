import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paiement-methods',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paiement-methods.html',
  styleUrl: './paiement-methods.css'
})
export class PaiementMethods {

  @Output()
  selection = new EventEmitter<any>();

  methodeSelectionnee = '';

  methodes = [

    {
      id: 'wave',
      nom: 'Wave',
      description: 'Paiement mobile sécurisé',
      icone: '💙'
    },

    {
      id: 'orange_money',
      nom: 'Orange Money',
      description: 'Paiement Orange Money',
      icone: '🟠'
    }

  ];

  choisir(methode: any): void {

    this.methodeSelectionnee = methode.id;

    this.selection.emit(methode);

  }

}