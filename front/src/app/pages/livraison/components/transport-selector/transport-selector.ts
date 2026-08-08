import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transport-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transport-selector.html',
  styleUrl: './transport-selector.css'
})
export class TransportSelector {

  @Output()
  selection = new EventEmitter<any>();

  modes = [

    {
      id: 1,
      nom: 'Livraison standard',
      description: '2 à 4 jours ouvrables',
      prix: 1500,
      icone: '🚚'
    },

    {
      id: 2,
      nom: 'Livraison express',
      description: '24 heures',
      prix: 3000,
      icone: '⚡'
    },

    {
      id: 3,
      nom: 'Retrait en boutique',
      description: 'Gratuit',
      prix: 0,
      icone: '🏪'
    }

  ];

  modeSelectionne = this.modes[0];

  choisir(mode:any){

    this.modeSelectionne = mode;

    this.selection.emit(mode);

  }

}