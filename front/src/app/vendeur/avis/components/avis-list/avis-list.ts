import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avis-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './avis-list.html',
  styleUrl: './avis-list.css'
})
export class AvisList {

  @Input() avis: any[] = [];

  @Output()
  selection = new EventEmitter<any>();

  ouvrirAvis(avis: any): void {

    this.selection.emit(avis);

  }

  etoiles(note: number): number[] {

    return Array(note).fill(0);

  }

  etoilesVides(note: number): number[] {

    return Array(5 - note).fill(0);

  }

}