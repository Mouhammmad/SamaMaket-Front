import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { AvisService } from '../../../../core/services/avis.service';

@Component({
  selector: 'app-avis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './avis.html',
  styleUrl: './avis.css',
})
export class Avis implements OnInit {

  private avisSubject = new BehaviorSubject<any[]>([]);
  avis$ = this.avisSubject.asObservable();
  private avisFiltresSubject = new BehaviorSubject<any[]>([]);
  avisFiltres$ = this.avisFiltresSubject.asObservable();

  recherche = '';
  noteSelectionnee = 'toutes';

  private chargementSubject = new BehaviorSubject(true);
  chargement$ = this.chargementSubject.asObservable();

  private messageSubject = new BehaviorSubject('');
  message$ = this.messageSubject.asObservable();

  showConfirmModal = false;
  confirmModalMessage = '';
  confirmModalAction: (() => void) | null = null;

  constructor(
    private avisService: AvisService
  ) {}

  ngOnInit(): void {
    this.chargerAvis();
  }

  chargerAvis(): void {
    this.chargementSubject.next(true);
    this.messageSubject.next('');
    this.avisService.getMesAvis().subscribe({
      next: (data: any) => {
        const newAvis = Array.isArray(data) ? data : data.results || [];
        this.avisSubject.next(newAvis);
        this.appliquerFiltres();
        this.messageSubject.next(newAvis.length ? '' : "Vous n'avez pas encore laissé d'avis.");
        this.chargementSubject.next(false);
      },
      error: () => {
        this.messageSubject.next('Impossible de charger vos avis.');
        this.avisSubject.next([]);
        this.chargementSubject.next(false);
      }
    });
  }

  supprimerAvis(id: number, produitNom: string): void {
    this.confirmModalMessage = `Êtes-vous sûr de vouloir supprimer votre avis sur "${produitNom}" ?`;
    this.confirmModalAction = () => {
      this.avisService.supprimerAvis(id).subscribe({
        next: () => {
          const currentAvis = this.avisSubject.value;
          const newAvis = currentAvis.filter(a => a.id !== id);
          this.avisSubject.next(newAvis);
          this.appliquerFiltres();
          if (!newAvis.length) {
            this.messageSubject.next("Vous n'avez pas encore laissé d'avis.");
          }
          this.closeConfirmModal();
        },
        error: () => {
          console.error('[Avis] Error deleting avis');
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
    const note = this.noteSelectionnee === 'toutes'
      ? null
      : Number(this.noteSelectionnee);

    this.avisFiltresSubject.next(this.avisSubject.value.filter((avis) => {
      const texte = `${avis.produit?.nom || ''} ${avis.commentaire || ''}`.toLowerCase();
      return (!recherche || texte.includes(recherche)) &&
        (note === null || Number(avis.note) === note);
    }));
  }

}
