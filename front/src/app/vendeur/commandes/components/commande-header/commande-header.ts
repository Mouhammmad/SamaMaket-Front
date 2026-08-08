import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commande-header.html',
  styleUrl: './commande-header.css'
})
export class CommandeHeader {

  @Output() actualiser = new EventEmitter<void>();

}