import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-securite',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './securite.html',
  styleUrl: './securite.css'
})
export class Securite {

  ancienMotDePasse = '';

  nouveauMotDePasse = '';

  confirmation = '';

  modifierMotDePasse() {

    if (
      !this.ancienMotDePasse ||
      !this.nouveauMotDePasse ||
      !this.confirmation
    ) {

      alert("Veuillez remplir tous les champs.");

      return;

    }

    if (this.nouveauMotDePasse !== this.confirmation) {

      alert("Les mots de passe ne correspondent pas.");

      return;

    }

    alert("Mot de passe modifié avec succès.");

    this.ancienMotDePasse = '';
    this.nouveauMotDePasse = '';
    this.confirmation = '';

  }

}