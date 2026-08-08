import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotion-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-filter.html',
  styleUrl: './promotion-filter.css'
})
export class PromotionFilter {

  @Output() recherche = new EventEmitter<string>();

  @Output() statut = new EventEmitter<string>();

  @Output() type = new EventEmitter<string>();

  rechercheChange(event: Event): void {

    const valeur = (event.target as HTMLInputElement).value;

    this.recherche.emit(valeur);

  }

  statutChange(event: Event): void {

    const valeur = (event.target as HTMLSelectElement).value;

    this.statut.emit(valeur);

  }

  typeChange(event: Event): void {

    const valeur = (event.target as HTMLSelectElement).value;

    this.type.emit(valeur);

  }

}