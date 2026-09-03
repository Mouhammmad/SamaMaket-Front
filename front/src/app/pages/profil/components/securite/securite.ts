import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UtilisateurService } from '../../../../core/services/utilisateur';

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
  message = '';
  enCours = false;

  constructor(
    private utilisateurService: UtilisateurService
  ) {}

  modifierMotDePasse() {
    this.message = '';

    if (
      !this.ancienMotDePasse ||
      !this.nouveauMotDePasse ||
      !this.confirmation
    ) {
      this.message = 'Veuillez remplir tous les champs.';
      return;
    }

    if (this.nouveauMotDePasse !== this.confirmation) {
      this.message = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.enCours = true;

    this.utilisateurService.changerMotDePasse({
      ancien_mot_de_passe: this.ancienMotDePasse,
      nouveau_mot_de_passe: this.nouveauMotDePasse
    }).subscribe({
      next: () => {
        this.message = 'Mot de passe modifié avec succès.';
        this.ancienMotDePasse = '';
        this.nouveauMotDePasse = '';
        this.confirmation = '';
        this.enCours = false;
      },
      error: (err) => {
        this.message = err?.error?.ancien_mot_de_passe?.[0] || err?.error?.detail || 'Impossible de modifier le mot de passe.';
        this.enCours = false;
      }
    });
  }

}