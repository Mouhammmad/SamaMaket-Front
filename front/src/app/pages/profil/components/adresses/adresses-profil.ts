import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adresses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adresses-profil.html',
  styleUrl: './adresses-profil.css'
})
export class Adresses {

  adresses = [
    {
      titre: 'Domicile',
      adresse: 'Parcelles Assainies, Dakar',
      ville: 'Dakar',
      pays: 'Sénégal',
      principale: true
    },
    {
      titre: 'Bureau',
      adresse: 'Plateau, Dakar',
      ville: 'Dakar',
      pays: 'Sénégal',
      principale: false
    }
  ];

  ajouterAdresse() {
    alert("Cette fonctionnalité sera connectée au backend.");
  }

  supprimer(index: number) {
    this.adresses.splice(index, 1);
  }

}