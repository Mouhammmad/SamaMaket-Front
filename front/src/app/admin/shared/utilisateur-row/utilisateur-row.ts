import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utilisateur-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utilisateur-row.html',
  styleUrl: './utilisateur-row.css'
})
export class UtilisateurRow {

  @Input() utilisateur: any;

}