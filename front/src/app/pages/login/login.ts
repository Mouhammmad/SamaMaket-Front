import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth';

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

    console.log(response.user);
    console.log(response.user.role);

    localStorage.setItem('access', response.access);
    localStorage.setItem('refresh', response.refresh);
    localStorage.setItem('user', JSON.stringify(response.user));

    if (response.user.role === 'VENDOR') {

      this.router.navigate(['/vendeur']);

    } else if (response.user.role === 'CUSTOMER') {

      this.router.navigate(['/client']);

    } else if (response.user.role === 'ADMIN') {

      this.router.navigate(['/admin']);

    } else {

      this.router.navigate(['/']);

    }

  },

  error: (err) => {

    console.error(err);

    this.erreur = 'Email ou mot de passe incorrect.';

    this.chargement = false;

  }

});
  }
}