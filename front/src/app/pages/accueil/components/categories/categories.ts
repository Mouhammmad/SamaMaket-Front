import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(
    private categorieService: CategorieService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (response) => {
        const data = Array.isArray(response) ? response : response?.results || [];
        this.categories = data.map((categorie: any) => ({
          ...categorie,
          nom: categorie?.nom || 'Catégorie',
          icon: this.getIcon(categorie?.nom)
        }));

        if (!this.categories.length) {
          this.categories = this.getFallbackCategories();
        }
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.categories = this.getFallbackCategories();
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private getFallbackCategories(): any[] {
    return [
      { id: 1, nom: 'Mode', icon: '👗' },
      { id: 2, nom: 'Électronique', icon: '📱' },
      { id: 3, nom: 'Alimentation', icon: '🥭' },
      { id: 4, nom: 'Maison', icon: '🏠' },
      { id: 5, nom: 'Beauté', icon: '✨' },
      { id: 6, nom: 'Artisanat', icon: '🎨' }
    ];
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
