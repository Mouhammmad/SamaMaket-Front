import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zone-danger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zone-danger.html',
  styleUrl: './zone-danger.css'
})
export class ZoneDanger {

  supprimerCompte(): void {

    const confirmation = confirm(
      "Êtes-vous sûr de vouloir supprimer définitivement votre compte ?"
    );

    if (confirmation) {

      alert("Votre compte sera supprimé après validation du backend.");

    }

  }

}