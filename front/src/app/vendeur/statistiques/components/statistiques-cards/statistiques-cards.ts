import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistiques-cards',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './statistiques-cards.html',
  styleUrl: './statistiques-cards.css'
})
export class StatistiquesCards {

  @Input()
  stats: any;

}