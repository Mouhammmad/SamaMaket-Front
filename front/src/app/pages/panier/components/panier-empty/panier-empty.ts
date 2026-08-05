import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-panier-empty',
  standalone: true,
  templateUrl: './panier-empty.html',
  styleUrl: './panier-empty.css'
})
export class PanierEmpty {

  @Output() continuer = new EventEmitter<void>();

}