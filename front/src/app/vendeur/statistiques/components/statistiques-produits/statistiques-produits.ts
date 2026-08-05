import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistiques-produits',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './statistiques-produits.html',
  styleUrl: './statistiques-produits.css'
})
export class StatistiquesProduits {

  @Input()
  stats: any;

}