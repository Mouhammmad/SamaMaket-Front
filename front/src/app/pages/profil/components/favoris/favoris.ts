import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoriService } from '../../../../core/services/favori.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './favoris.html',
  styleUrl: './favoris.css',
})
export class Favoris implements OnInit {

  private favorisSubject = new BehaviorSubject<any[]>([]);
  favoris$ = this.favorisSubject.asObservable();
  private favorisFiltresSubject = new BehaviorSubject<any[]>([]);
  favorisFiltres$ = this.favorisFiltresSubject.asObservable();

  recherche = '';
  tri = 'recent';

  private chargementSubject = new BehaviorSubject(true);
  chargement$ = this.chargementSubject.asObservable();

  private messageSubject = new BehaviorSubject('');
  message$ = this.messageSubject.asObservable();

  showConfirmModal = false;
  confirmModalMessage = '';
  confirmModalAction: (() => void) | null = null;

  constructor(
    private favoriService: FavoriService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerFavoris();
  }

  chargerFavoris(): void {
    this.chargementSubject.next(true);
    console.log('[Favoris] Starting to load favoris...');
    this.favoriService.getFavoris().subscribe({
      next: (data: any) => {
        console.log('[Favoris] Data received:', data);
        const newFavoris = Array.isArray(data) ? data : data.results || [];
        this.favorisSubject.next(newFavoris);
        this.appliquerFiltres();
        console.log('[Favoris] Favoris set to:', newFavoris.length, 'items');
        if (!newFavoris.length) {
          this.messageSubject.next("Vous n'avez pas de favoris pour le moment.");
        } else {
          this.messageSubject.next('');
        }
        this.chargementSubject.next(false);
      },
      error: (err: any) => {
        console.error('[Favoris] Error loading:', err);
        this.messageSubject.next('Impossible de charger vos favoris.');
        this.favorisSubject.next([]);
        this.chargementSubject.next(false);
      }
    });
  }

  supprimerFavori(id: number, nomProduit: string): void {
    this.confirmModalMessage = `Êtes-vous sûr de vouloir retirer "${nomProduit}" de vos favoris ?`;
    this.confirmModalAction = () => {
      this.favoriService.supprimerFavori(id).subscribe({
        next: () => {
          const currentFavoris = this.favorisSubject.value;
          const newFavoris = currentFavoris.filter(f => f.id !== id);
          this.favorisSubject.next(newFavoris);
          this.appliquerFiltres();
          if (!newFavoris.length) {
            this.messageSubject.next("Vous n'avez pas de favoris pour le moment.");
          }
          this.closeConfirmModal();
        },
        error: () => {
          console.error('[Favoris] Error deleting favori');
          this.closeConfirmModal();
        }
      });
    };
    this.showConfirmModal = true;
  }

  confirmerAction(): void {
    if (this.confirmModalAction) {
      this.confirmModalAction();
    }
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.confirmModalMessage = '';
    this.confirmModalAction = null;
  }

  appliquerFiltres(): void {
    const recherche = this.recherche.trim().toLowerCase();
    const favoris = this.favorisSubject.value.filter((favori) => {
      const nom = String(favori.produit?.nom || '').toLowerCase();
      return !recherche || nom.includes(recherche);
    });

    favoris.sort((a, b) => {
      if (this.tri === 'nom') {
        return String(a.produit?.nom || '').localeCompare(String(b.produit?.nom || ''));
      }
      if (this.tri === 'prix') {
        return Number(a.produit?.prix || 0) - Number(b.produit?.prix || 0);
      }
      return new Date(b.date_ajout || 0).getTime() - new Date(a.date_ajout || 0).getTime();
    });

    this.favorisFiltresSubject.next(favoris);
  }

}
