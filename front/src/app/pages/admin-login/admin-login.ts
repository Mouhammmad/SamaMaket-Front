import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css'
})
export class AdminLogin {
  username = '';
  password = '';

  erreur = '';
  chargement = false;

  constructor(
    private authService: AuthService,
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
        const user = response?.user ?? {};
        const role = String(user.role ?? '').toUpperCase();
        const isAdmin = role === 'ADMIN' || !!user.is_staff || !!user.is_superuser;

        if (!isAdmin) {
          this.erreur = 'Accès réservé aux administrateurs.';
          this.chargement = false;
          return;
        }

        localStorage.setItem('access', response.access);
        localStorage.setItem('refresh', response.refresh);
        localStorage.setItem('user', JSON.stringify(user));

        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error(err);
        this.erreur = 'Email ou mot de passe incorrect.';
        this.chargement = false;
      }
    });
  }
}
