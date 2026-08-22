import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'app-vendeur-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './vendeur-search.html',
  styleUrl: './vendeur-search.css'
})
export class VendeurSearch {

  recherche = '';

  @Output()
  rechercheChange =
    new EventEmitter<string>();


  rechercher(): void {

    this.rechercheChange.emit(
      this.recherche.trim()
    );

  }


  effacer(): void {

    this.recherche = '';

    this.rechercheChange.emit('');

  }

}