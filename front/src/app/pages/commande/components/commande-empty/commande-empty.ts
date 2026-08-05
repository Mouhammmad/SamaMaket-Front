import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-commande-empty',
  standalone: true,
  templateUrl: './commande-empty.html',
  styleUrl: './commande-empty.css'
})
export class CommandeEmpty {

  @Output()
  decouvrir = new EventEmitter<void>();

}