import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-produit-header',
  standalone: true,
  templateUrl: './produit-header.html',
  styleUrl: './produit-header.css'
})
export class ProduitHeader {

  private _total = 0;

  @Input()
  set total(value: number) {
    this._total = value ?? 0;
  }

  get total(): number {
    return this._total;
  }

  @Output() ajouter = new EventEmitter<void>();

}