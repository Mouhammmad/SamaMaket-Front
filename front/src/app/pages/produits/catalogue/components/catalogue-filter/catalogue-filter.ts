import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogue-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './catalogue-filter.html',
  styleUrl: './catalogue-filter.css'
})
export class CatalogueFilter {

  @Input()
  categories: any[] = [];

  @Input()
  filtres: any = {
    categorie: null,
    prixMin: 0,
    prixMax: 150000,
    note: null,
    vendeurVerifie: false
  };

  @Output()
  filtrer = new EventEmitter<any>();

  appliquer(): void {

    this.filtrer.emit(this.filtres);

  }

  reinitialiser(): void {

    this.filtres = {
      categorie: null,
      prixMin: 0,
      prixMax: 150000,
      note: null,
      vendeurVerifie: false
    };

    this.appliquer();

  }

}