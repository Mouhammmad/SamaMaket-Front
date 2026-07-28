import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './profil.html',
  styleUrl: './profil.scss',
})
export class Profil {
  activeSidebarItem = 'profil' as const;

  profil = {
    prenom: 'Moussa',
    nom: 'Sow',
    email: 'moussa@email.com',
    telephone: '+221 77 123 45 67',
    ville: 'Dakar, Sénégal'
  };

  notifications = {
    commandes: true,
    promos: true,
    favoris: true,
    newsletter: false
  };

  sauvegarderProfil(): void {
    console.log('Profil sauvegardé', this.profil);
  }

  changerMotDePasse(): void {
    console.log('Ouverture du formulaire de mot de passe');
  }

  supprimerCompte(): void {
    console.log('Suppression de compte demandée');
  }
}
