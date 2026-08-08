import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livraison-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './livraison-filter.html',
  styleUrl: './livraison-filter.css'
})
export class LivraisonFilter {

  recherche = '';

  statut = '';

  @Output()
  rechercheChange = new EventEmitter<string>();

  @Output()
  statutChange = new EventEmitter<string>();

  rechercher(): void {

    this.rechercheChange.emit(this.recherche);

  }

  changerStatut(): void {

    this.statutChange.emit(this.statut);

  }

}