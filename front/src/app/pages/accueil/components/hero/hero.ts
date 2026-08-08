import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  query = '';

  constructor(private router: Router) {}

  rechercher(): void {
    const texte = this.query.trim();

    this.router.navigate(['/produits'], {
      queryParams: texte ? { recherche: texte } : {}
    });
  }
}
