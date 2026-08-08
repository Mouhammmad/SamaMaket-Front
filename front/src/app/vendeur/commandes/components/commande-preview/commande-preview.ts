import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commande-preview.html',
  styleUrl: './commande-preview.css'
})
export class CommandePreview {

  @Input() commande: any = null;

  @Output() fermer = new EventEmitter<void>();

  @Output() modifierStatut = new EventEmitter<any>();

}