import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commande-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './commande-filter.html',
  styleUrl: './commande-filter.css'
})
export class CommandeFilter {

  @Output() filtreChange = new EventEmitter<any>();

  recherche = '';

  statut = '';

  paiement = '';

  dateDebut = '';

  dateFin = '';

  appliquerFiltres() {

    this.filtreChange.emit({

      recherche: this.recherche,

      statut: this.statut,

      paiement: this.paiement,

      dateDebut: this.dateDebut,

      dateFin: this.dateFin

    });

  }

  reinitialiser() {

    this.recherche = '';

    this.statut = '';

    this.paiement = '';

    this.dateDebut = '';

    this.dateFin = '';

    this.appliquerFiltres();

  }

}