import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistiques-ventes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './statistiques-ventes.html',
  styleUrl: './statistiques-ventes.css'
})
export class StatistiquesVentes {

  @Input()
  stats: any;

}