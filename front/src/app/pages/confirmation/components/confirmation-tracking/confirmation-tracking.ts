import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-tracking.html',
  styleUrl: './confirmation-tracking.css'
})
export class ConfirmationTracking {

  @Input() statut = 'en_attente';

  etapes = [

    {
      code: 'en_attente',
      titre: 'Commande reçue'
    },

    {
      code: 'confirme',
      titre: 'Commande confirmée'
    },

    {
      code: 'expedie',
      titre: 'Commande expédiée'
    },

    {
      code: 'livre',
      titre: 'Commande livrée'
    }

  ];

  estActive(index: number): boolean {

    const courant = this.etapes.findIndex(

      e => e.code === this.statut

    );

    return index <= courant;

  }

}