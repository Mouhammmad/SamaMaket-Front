import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CategorieService } from '../../../../core/services/categorie';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  query = '';
  categorie: number | null = null;
  categories: any[] = [];

  constructor(
    private router: Router,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe({
      next: (categories) => this.categories = categories || []
    });
  }

  rechercher(): void {
    const texte = this.query.trim();

    const queryParams: any = {};
    if (texte) queryParams.recherche = texte;
    if (this.categorie) queryParams.categorie = this.categorie;
    this.router.navigate(['/produits'], { queryParams });
  }
}
