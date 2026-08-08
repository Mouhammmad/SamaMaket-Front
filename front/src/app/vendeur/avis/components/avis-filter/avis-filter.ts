import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avis-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './avis-filter.html',
  styleUrl: './avis-filter.css'
})
export class AvisFilter {

  recherche = '';

  note = '';

  @Output()
  rechercheChange = new EventEmitter<string>();

  @Output()
  noteChange = new EventEmitter<string>();

  rechercher(): void {

    this.rechercheChange.emit(this.recherche);

  }

  changerNote(): void {

    this.noteChange.emit(this.note);

  }

}