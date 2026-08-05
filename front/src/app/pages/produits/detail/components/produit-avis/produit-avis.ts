import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit-avis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produit-avis.html',
  styleUrl: './produit-avis.css'
})
export class ProduitAvis {

  @Input()
  produit: any;

  avis = [
    {
      utilisateur: 'Mamadou D.',
      note: 5,
      commentaire: 'Excellent produit, conforme à la description.',
      date: '10 août 2026'
    },
    {
      utilisateur: 'Awa S.',
      note: 4,
      commentaire: 'Très satisfait de mon achat. Livraison rapide.',
      date: '08 août 2026'
    }
  ];

  get moyenne(): number {

    if (!this.avis.length) {
      return 0;
    }

    const total = this.avis.reduce(
      (somme, avis) => somme + avis.note,
      0
    );

    return Number((total / this.avis.length).toFixed(1));

  }

}