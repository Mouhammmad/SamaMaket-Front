import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commande-dashboard.html',
  styleUrl: './commande-dashboard.css'
})
export class CommandeDashboard {

  @Input()
  stats = {

    total: 0,

    enCours: 0,

    livrees: 0,

    depense: 0

  };

}