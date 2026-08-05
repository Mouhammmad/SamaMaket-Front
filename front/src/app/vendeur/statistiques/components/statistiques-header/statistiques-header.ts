import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistiques-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './statistiques-header.html',
  styleUrl: './statistiques-header.css'
})
export class StatistiquesHeader {

  aujourdHui = new Date();

}