import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistiques-favoris',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistiques-favoris.html',
  styleUrl: './statistiques-favoris.css'
})
export class StatistiquesFavoris {

  @Input()
  stats: any;

}