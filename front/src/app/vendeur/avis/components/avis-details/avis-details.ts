import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avis-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './avis-details.html',
  styleUrl: './avis-details.css'
})
export class AvisDetails {

  @Input()
  avis: any;

  etoiles(note: number): number[] {

    return Array(note).fill(0);

  }

  etoilesVides(note: number): number[] {

    return Array(5 - note).fill(0);

  }

}