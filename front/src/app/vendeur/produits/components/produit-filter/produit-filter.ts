import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produit-filter.html',
  styleUrl: './produit-filter.css'
})
export class ProduitFilter {

  @Input() categories: any[] = [];

  @Output() recherche = new EventEmitter<string>();

  @Output() categorie = new EventEmitter<string>();

  @Output() statut = new EventEmitter<string>();

  rechercheChange(event: Event) {

    const value = (event.target as HTMLInputElement).value;

    this.recherche.emit(value);

  }

  categorieChange(event: Event) {

    const value = (event.target as HTMLSelectElement).value;

    this.categorie.emit(value);

  }

  statutChange(event: Event) {

    const value = (event.target as HTMLSelectElement).value;

    this.statut.emit(value);

  }

}