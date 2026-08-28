import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  prenom = '';
  nom = '';
  email = '';
  phone = '';
  password = '';
  confirmation = '';
  role = 'CUSTOMER';

  erreur = '';
  chargement = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {

    this.erreur = '';

    if (this.password !== this.confirmation) {
      this.erreur = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (this.password.length < 8) {
      this.erreur = 'Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }

    this.chargement = true;

    const identifiantBase = (this.email.split('@')[0] || this.prenom + this.nom)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase();

    const utilisateur = {
      username: `${identifiantBase || 'user'}${Date.now().toString().slice(-6)}`,
      first_name: this.prenom,
      last_name: this.nom,
      email: this.email,
      phone: this.phone,
      password: this.password,
      role: this.role
    };

    this.authService.register(utilisateur).subscribe({

      next: () => {

        alert('Compte créé avec succès !');

        this.router.navigate(['/login']);

      },

      error: (err) => {

        console.error(err);

        const details = err?.error;
        if (details?.username?.length) {
          this.erreur = `Nom d'utilisateur : ${details.username[0]}`;
        } else if (details?.password?.length) {
          this.erreur = `Mot de passe : ${details.password[0]}`;
        } else if (details?.email?.length) {
          this.erreur = `Email : ${details.email[0]}`;
        } else {
          this.erreur = details?.detail || 'Impossible de créer le compte.';
        }

        this.chargement = false;

      }

    });

  }

}
