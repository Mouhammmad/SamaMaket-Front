import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from './favorite.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="favorite-btn"
      [class.is-active]="isActive"
      [disabled]="isPending"
      (click)="onClick()"
      [attr.aria-pressed]="isActive"
      aria-label="Ajouter ou retirer des favoris"
    >
      <i [class]="isActive ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
    </button>
  `,
  styles: [
    `
      .favorite-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.25rem;
        color: #999;
        transition: color 0.15s ease, transform 0.1s ease;
      }
      .favorite-btn:active {
        transform: scale(0.9);
      }
      .favorite-btn.is-active {
        color: #ff6b35;
      }
      .favorite-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,
  ],
})
export class FavoriteButtonComponent implements OnInit, OnChanges {
  @Input({ required: true }) itemId!: number;
  @Input() initialIsFavorite = false;
  @Output() toggled = new EventEmitter<{ itemId: number; isFavorite: boolean }>();

  private favoriteService = inject(FavoriteService);

  isActive = false;
  // Empêche un second clic (add/remove) tant que la requête précédente
  // n'a pas répondu, pour éviter que les deux réponses se croisent.
  isPending = false;

  ngOnInit(): void {
    this.isActive = this.initialIsFavorite;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialIsFavorite']) {
      this.isActive = this.initialIsFavorite;
    }
  }

  onClick(): void {
    if (this.isPending) {
      return;
    }

    // Flip d'icône instantané (UI optimiste), mais on n'informe le parent
    // qu'une fois la requête confirmée : si ce bouton vit dans une liste
    // (ex. page favoris) qui retire la carte au signal `toggled`, il faut
    // que ce composant soit encore vivant pour recevoir la réponse HTTP.
    // Le retirer du DOM avant la confirmation romprait la requête en vol
    // ou rendrait la gestion d'erreur inopérante (plus personne à l'écoute
    // une fois le composant détruit).
    const nextState = !this.isActive;
    this.isActive = nextState;
    this.isPending = true;

    const request$ = nextState
      ? this.favoriteService.addFavorite(this.itemId)
      : this.favoriteService.removeFavorite(this.itemId);

    request$.subscribe({
      next: () => {
        this.isPending = false;
        // Émis seulement après confirmation serveur : le parent peut agir
        // (ex. retirer la carte de la grille des favoris) en sachant que
        // le changement a bien été persisté.
        this.toggled.emit({ itemId: this.itemId, isFavorite: nextState });
      },
      error: () => {
        // Échec API : on annule simplement le changement visuel local.
        // Rien à notifier au parent puisqu'il n'a jamais été informé du
        // changement (on n'émet plus de façon optimiste).
        this.isActive = !nextState;
        this.isPending = false;
      },
    });
  }
}
