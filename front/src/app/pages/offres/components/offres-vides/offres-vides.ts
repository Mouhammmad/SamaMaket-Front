import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offres-vides',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './offres-vides.html',
  styleUrl: './offres-vides.css'
})
export class OffresVides {

  @Input() titre = 'Aucun résultat';

  @Input() message =
    'Aucun élément disponible pour le moment.';

  @Input() icone = '📦';

}