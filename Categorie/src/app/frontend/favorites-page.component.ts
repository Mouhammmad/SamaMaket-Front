import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FavoriteService } from './favorite.service';
import { FavoriteButtonComponent } from './favorite-button.component';
import { Item } from './favorite.model';

type SortOption = 'recent' | 'price-asc' | 'price-desc';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FavoriteButtonComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss',
})
export class FavoritesPageComponent implements OnInit {
  private favoriteService = inject(FavoriteService);
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  allItems: Item[] = [];
  items: Item[] = [];
  recommended: Item[] = [];
  loading = true;
  error = false;

  activeCategory = 'Tous';
  sortOption: SortOption = 'recent';

  get categories(): { name: string; count: number }[] {
    const counts = new Map<string, number>();
    for (const item of this.allItems) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return [
      { name: 'Tous', count: this.allItems.length },
      ...Array.from(counts.entries()).map(([name, count]) => ({ name, count })),
    ];
  }

  ngOnInit(): void {
    this.loadFavorites();
    this.loadRecommendations();
  }

  private loadRecommendations(): void {
    // Réutilise l'endpoint catalogue existant de SAMAMARKET (celui qui
    // alimente déjà la page catalogue, avec pagination DRF classique
    // { results: [...] }). On exclut les produits déjà en favoris et on
    // se limite à 4 suggestions.
    this.http
      .get<Item[] | { results: Item[] }>('/api/v1/products/?page_size=8')
      .pipe(
        map((res) => (Array.isArray(res) ? res : res.results)),
        catchError(() => of([] as Item[])),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((items) => {
        const favoriteIds = new Set(this.allItems.map((i) => i.id));
        this.recommended = items
          .filter((i) => !favoriteIds.has(i.id))
          .slice(0, 4);
      });
  }

  loadFavorites(): void {
    this.loading = true;
    this.favoriteService
      .getFavorites()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items) => {
          this.allItems = items;
          this.applyFilters();
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
      });
  }

  applyFilters(): void {
    let result =
      this.activeCategory === 'Tous'
        ? [...this.allItems]
        : this.allItems.filter((i) => i.category === this.activeCategory);

    if (this.sortOption === 'price-asc') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'price-desc') {
      result = result.sort((a, b) => b.price - a.price);
    }

    this.items = result;
  }

  onSelectCategory(category: string): void {
    this.activeCategory = category;
    this.applyFilters();
  }

  onSortChange(sort: SortOption): void {
    this.sortOption = sort;
    this.applyFilters();
  }

  onToggle(event: { itemId: number; isFavorite: boolean }): void {
    // À ce stade, `toggled` n'est émis qu'après confirmation serveur
    // (voir FavoriteButtonComponent) : on peut retirer la carte en toute
    // sécurité, la suppression est déjà persistée côté API.
    this.allItems = this.allItems.filter((i) => i.id !== event.itemId);
    this.applyFilters();
  }

  stars(rating: number): string {
    const rounded = Math.round(rating);
    return '★'.repeat(rounded) + '☆'.repeat(Math.max(0, 5 - rounded));
  }

  onClearAll(): void {
    if (this.allItems.length === 0) return;
    const removals = this.allItems.map((item) =>
      this.favoriteService.removeFavorite(item.id).pipe(catchError(() => of(null))),
    );
    forkJoin(removals)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.allItems = [];
        this.applyFilters();
      });
  }
}
