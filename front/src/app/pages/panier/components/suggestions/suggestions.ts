import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestions.html',
  styleUrl: './suggestions.css'
})
export class Suggestions {

  @Input() produits: any[] = [];

  @Output() ajouter = new EventEmitter<any>();

}