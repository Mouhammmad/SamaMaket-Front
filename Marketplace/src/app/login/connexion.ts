import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.scss']
})
export class Login {
  username = '';
  password = '';
  erreur = '';
  chargement = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.erreur = '';
    this.chargement = true;

    this.authService.login(this.username.trim(), this.password)
      .pipe(finalize(() => this.chargement = false))
      .subscribe({
        next: () => {
          const role = this.authService.getCurrentUserRole();
          if (role === 'VENDOR') {
            this.router.navigate(['/vendeur']);
          } else if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.error && error.error.detail) {
            this.erreur = error.error.detail;
          } else {
            this.erreur = 'Identifiants incorrects. Vérifie ton username et mot de passe.';
          }
          console.error('Login error', error);
        }
      });
  }
}