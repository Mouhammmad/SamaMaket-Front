import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../core/services/panier';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  nombreArticles = 0;
  estConnecte = false;

  constructor(
    private panierService: PanierService,
    private authService: AuthService
  ) {
    this.panierService.nombreArticles$.subscribe((nombre: number) => {
      this.nombreArticles = nombre;
    });
    this.estConnecte = this.authService.estConnecte();
  }

}