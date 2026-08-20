import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendeurs-filtres',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './vendeur-filtres.html',
  styleUrl: './vendeur-filtres.css'
})
export class VendeursFiltres {

  ville = '';

  noteMinimum = 0;

  @Output()
  filtresChange =
    new EventEmitter<{
      ville: string;
      noteMinimum: number;
    }>();


  appliquerFiltres(): void {

    this.filtresChange.emit({
      ville: this.ville.trim(),
      noteMinimum: Number(this.noteMinimum)
    });

  }


  reinitialiser(): void {

    this.ville = '';

    this.noteMinimum = 0;

    this.appliquerFiltres();

  }

}