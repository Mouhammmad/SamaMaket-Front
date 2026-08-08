import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-commande-header',
  standalone: true,
  templateUrl: './commande-header.html',
  styleUrl: './commande-header.css'
})
export class CommandeHeader {

  @Output()
  actualiser = new EventEmitter<void>();

}