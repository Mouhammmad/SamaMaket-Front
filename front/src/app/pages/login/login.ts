import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth';
import { UtilisateurService } from '../../core/services/utilisateur';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  erreur = '';
  chargement = false;

  constructor(
    private authService: AuthService,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  onSubmit() {

    this.erreur = '';
    this.chargement = true;

    this.authService.login({
  username: this.username,
  password: this.password
}).subscribe({

  next: (response: any) => {
    if (!response?.access || !response?.refresh) {
      this.erreur = 'Réponse de connexion invalide.';
      this.chargement = false;
      return;
    }

    localStorage.setItem('access', response.access);
    localStorage.setItem('refresh', response.refresh);
    this.authService.refreshAuthState();

    if (response.user) {
      this.finaliserConnexion(response.user);
      return;
    }

    this.utilisateurService.getProfil().subscribe({
      next: (user) => this.finaliserConnexion(user),
      error: () => {
        this.authService.logout();
        this.erreur = 'Impossible de récupérer votre profil.';
        this.chargement = false;
      }
    });

  },

  error: (err) => {

    console.error(err);

    this.erreur = 'Email ou mot de passe incorrect.';

    this.chargement = false;

  }

});
  }

  private finaliserConnexion(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.authService.refreshAuthState();
    this.chargement = false;

    switch (user?.role) {
      case 'VENDOR':
        this.router.navigate(['/vendeur']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}