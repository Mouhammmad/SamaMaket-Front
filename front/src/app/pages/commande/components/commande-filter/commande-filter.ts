import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commande-filter.html',
  styleUrl: './commande-filter.css'
})
export class CommandeFilter {

  @Output()
  filtrer = new EventEmitter<string>();

  filtreActif = 'toutes';

  filtres = [

    {
      valeur: 'toutes',
      libelle: 'Toutes'
    },

    {
      valeur: 'en_attente',
      libelle: 'En attente'
    },

    {
      valeur: 'confirme',
      libelle: 'Confirmées'
    },

    {
      valeur: 'expedie',
      libelle: 'Expédiées'
    },

    {
      valeur: 'livre',
      libelle: 'Livrées'
    },

    {
      valeur: 'annule',
      libelle: 'Annulées'
    }

  ];

  selectionner(filtre: string): void {

    this.filtreActif = filtre;

    this.filtrer.emit(filtre);

  }

}