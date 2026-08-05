import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistiques-clients',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './statistiques-clients.html',
  styleUrl: './statistiques-clients.css'
})
export class StatistiquesClients {

  @Input()
  stats: any;

}