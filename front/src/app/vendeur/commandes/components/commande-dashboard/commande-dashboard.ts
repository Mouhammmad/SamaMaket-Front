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

  @Input() stats: any = {
    total: 0,
    en_attente: 0,
    expediees: 0,
    revenus: 0
  };

}