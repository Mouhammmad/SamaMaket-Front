import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UtilisateurService } from '../../../../core/services/utilisateur';
import { Utilisateur } from '../../../../core/models/utilisateur';

@Component({
  selector: 'app-informations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './infos-personnelles.html',
  styleUrl: './infos-personnelles.css'
})

export class Informations implements OnInit {
  
  utilisateur: Utilisateur = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: '',
    date_joined: '',
    ville: '',
    adresse: '',
    photo: ''
  };

  message = '';
  chargement = true;

  constructor(

    private utilisateurService: UtilisateurService

  ) {}

  ngOnInit(): void {

    this.chargerProfil();

  }

  chargerProfil() {

    this.utilisateurService.getProfil().subscribe({

      next: (data) => {

        this.utilisateur = data;

        this.chargement = false;

      },

      error: () => {

        this.message = 'Impossible de charger le profil.';

        this.chargement = false;

      }

    });

  }

  enregistrer() {

    this.utilisateurService
      .modifierProfil(this.utilisateur)
      .subscribe({

        next: (data) => {

          this.utilisateur = data;

          this.message = 'Profil mis à jour avec succès.';

        },

        error: () => {

          this.message = 'Erreur lors de la mise à jour du profil.';

        }

      });

  }

}