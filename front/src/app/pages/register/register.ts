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

    this.chargement = true;

    const utilisateur = {
      username: (this.prenom + this.nom).replace(/\s/g, '').toLowerCase(),
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

        this.erreur = 'Impossible de créer le compte.';

        this.chargement = false;

      }

    });

  }

}
