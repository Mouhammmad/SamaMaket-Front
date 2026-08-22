import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { AvisService } from '../../core/services/avis.service';

import { AvisHeader } from './components/avis-header/avis-header';
import { AvisFilter } from './components/avis-filter/avis-filter';
import { AvisList } from './components/avis-list/avis-list';
import { AvisDetails } from './components/avis-details/avis-details';
import { AvisStats } from './components/avis-stats/avis-stats';
import { AvisEmpty } from './components/avis-empty/avis-empty';

@Component({
  selector: 'app-avis',
  standalone: true,
  imports: [
    CommonModule,
    AvisHeader,
    AvisFilter,
    AvisList,
    AvisDetails,
    AvisStats,
    AvisEmpty
  ],
  templateUrl: './avis.html',
  styleUrl: './avis.css'
})
export class Avis implements OnInit {

  private avisSubject = new BehaviorSubject<any[]>([]);
  avis$ = this.avisSubject.asObservable();

  private chargementSubject = new BehaviorSubject(true);
  chargement$ = this.chargementSubject.asObservable();

  avisSelectionne: any = null;

  constructor(
    private avisService: AvisService
  ) {}

  ngOnInit(): void {

    this.chargerAvis();

  }

  chargerAvis(): void {

    this.chargementSubject.next(true);
    console.log('[Avis Vendeur] Starting to load avis...');

    this.avisService
      .getAvisVendeur()
      .subscribe({

        next: (data: any) => {
          console.log('[Avis Vendeur] Data received:', data);
          const avis = Array.isArray(data) ? data : (data.results || []);
          // Trier par date décroissante (plus récents en haut)
          const sorted = avis.sort((a: any, b: any) => {
            const dateA = new Date(a.date_creation || a.date || 0).getTime();
            const dateB = new Date(b.date_creation || b.date || 0).getTime();
            return dateB - dateA;
          });
          this.avisSubject.next(sorted);
          console.log('[Avis Vendeur] Avis set to:', sorted.length, 'items');
          this.chargementSubject.next(false);

        },
        error: (err: any) => {
          console.error('[Avis Vendeur] Error loading avis:', err);
          this.avisSubject.next([]);
          this.chargementSubject.next(false);
        }

      });

  }

  selectionnerAvis(avis: any): void {

    this.avisSelectionne = avis;

  }

  rechercher(texte: string): void {

    this.avisService.rechercherAvis(texte)

      .subscribe({

        next: (data: any) => {

          const avis = Array.isArray(data) ? data : (data.results || []);
          const sorted = avis.sort((a: any, b: any) => {
            const dateA = new Date(a.date_creation || a.date || 0).getTime();
            const dateB = new Date(b.date_creation || b.date || 0).getTime();
            return dateB - dateA;
          });
          this.avisSubject.next(sorted);

        }

      });

  }

  filtrerParNote(note: string): void {

    this.avisService.filtrerParNote(note)

      .subscribe({

        next: (data: any) => {

          const avis = Array.isArray(data) ? data : (data.results || []);
          const sorted = avis.sort((a: any, b: any) => {
            const dateA = new Date(a.date_creation || a.date || 0).getTime();
            const dateB = new Date(b.date_creation || b.date || 0).getTime();
            return dateB - dateA;
          });
          this.avisSubject.next(sorted);

        }

      });

  }

}