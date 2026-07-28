import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './notifications-profil.html',
  styleUrl: './notifications-profil.css'
})
export class Notifications {

  commandes = true;

  promotions = true;

  favoris = false;

  newsletter = true;

  enregistrer() {

    alert("Préférences enregistrées avec succès.");

  }

}