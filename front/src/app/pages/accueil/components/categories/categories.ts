import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategorieService } from '../../../../core/services/categorie';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  categories: any[] = [];

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe({
      next: (response) => {
        this.categories = Array.isArray(response) ? response : response?.results || [];
      },
      error: () => {
        this.categories = [];
      }
    });
  }

  getIcon(nom: string): string {
    const texte = (nom || '').toLowerCase();

    if (texte.includes('mode') || texte.includes('fashion')) return '👗';
    if (texte.includes('tech') || texte.includes('electron')) return '📱';
    if (texte.includes('aliment') || texte.includes('food') || texte.includes('nour')) return '🥭';
    if (texte.includes('maison') || texte.includes('home')) return '🏠';
    if (texte.includes('bea') || texte.includes('beaut')) return '✨';
    if (texte.includes('sport')) return '🏃';
    if (texte.includes('artisan')) return '🎨';

    return '🛍️';
  }
}
