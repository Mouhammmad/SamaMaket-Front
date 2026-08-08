import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produit-variantes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './produit-variantes.html',
  styleUrl: './produit-variantes.css'
})
export class ProduitVariantes {

  @Input() variantes: any[] = [];

  @Output() variantesChange = new EventEmitter<any[]>();

  ajouter() {

    this.variantes.push({

      nom: '',

      valeur: '',

      prix: 0,

      quantite_stock: 0,

      sku: '',

      image: null

    });

    this.variantesChange.emit(this.variantes);

  }

  supprimer(index: number) {

    this.variantes.splice(index, 1);

    this.variantesChange.emit(this.variantes);

  }

}