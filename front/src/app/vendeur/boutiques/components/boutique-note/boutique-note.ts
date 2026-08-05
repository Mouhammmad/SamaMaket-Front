import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique-note',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './boutique-note.html',
  styleUrl: './boutique-note.css'
})
export class BoutiqueNote {

  @Input()
  boutique: any;

  notes = [5,4,3,2,1];

  largeur(note:number): number{

    if(!this.boutique?.repartition_notes){
      return 0;
    }

    const total=this.boutique.nombre_avis || 1;

    const valeur=this.boutique.repartition_notes[note] || 0;

    return (valeur/total)*100;

  }

}