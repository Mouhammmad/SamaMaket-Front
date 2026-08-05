import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-livraison-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livraison-details.html',
  styleUrl: './livraison-details.css'
})
export class LivraisonDetails {

  @Input() livraison: any;

  @Output()
  modifierStatut = new EventEmitter<any>();

  changerStatut(): void {

    this.modifierStatut.emit(this.livraison);

  }

}