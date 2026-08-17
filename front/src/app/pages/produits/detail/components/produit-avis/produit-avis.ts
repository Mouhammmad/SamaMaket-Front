import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AvisService } from '../../../../../core/services/avis.service';
import { AuthService } from '../../../../../core/services/auth';

@Component({
  selector: 'app-produit-avis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit-avis.html',
  styleUrl: './produit-avis.css'
})
export class ProduitAvis implements OnInit, OnChanges {

  @Input()
  produit: any;

  avis: any[] = [];
  note = 5;
  commentaire = '';
  chargement = true;
  message = '';
  error = '';
  envoiEnCours = false;

  showConfirmModal = false;
  confirmModalMessage = '';
  confirmModalAction: (() => void) | null = null;

  constructor(
    private avisService: AvisService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.produit?.id) {
      this.chargerAvis();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['produit'] && this.produit?.id) {
      this.chargerAvis();
    }
  }

  isLoggedIn(): boolean {
    return this.authService.estConnecte();
  }

  chargerAvis(): void {
    this.chargement = true;
    this.message = '';

    this.avisService.getAvisProduit(this.produit.id).subscribe({
      next: (data: any) => {
        this.avis = Array.isArray(data) ? data : data.results || [];
        this.message = this.avis.length ? '' : 'Aucun avis disponible pour ce produit.';
        this.chargement = false;
      },
      error: () => {
        this.message = 'Impossible de charger les avis du produit.';
        this.avis = [];
        this.chargement = false;
      }
    });
  }

  ajouterAvis(): void {
    if (!this.isLoggedIn()) {
      this.error = 'Vous devez être connecté pour laisser un avis.';
      return;
    }

    if (this.note < 1 || this.note > 5) {
      this.error = 'La note doit être comprise entre 1 et 5.';
      return;
    }

    this.error = '';
    this.confirmModalMessage = 'Êtes-vous sûr de vouloir publier cet avis ?';
    this.confirmModalAction = () => {
      this.envoyerAvis();
    };
    this.showConfirmModal = true;
  }

  envoyerAvis(): void {
    this.envoiEnCours = true;

    this.avisService.ajouterAvis(this.produit.id, this.note, this.commentaire).subscribe({
      next: (data: any) => {
        // Ajouter localement l'avis retourné par l'API pour que l'utilisateur voie immédiatement son avis,
        // même si celui-ci n'est pas encore approuvé côté backend.
        const newAvis = data;
        this.commentaire = '';
        this.note = 5;
        this.avis = Array.isArray(this.avis) ? [newAvis, ...this.avis] : [newAvis];
        this.message = '';
        this.envoiEnCours = false;
        this.closeConfirmModal();
      },
      error: (err) => {
        this.error = err?.error?.erreur || err?.error?.detail || 'Impossible d\'envoyer votre avis.';
        this.envoiEnCours = false;
        this.closeConfirmModal();
      }
    });
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

  reviewAverage(): number {
    if (!this.avis.length) {
      return 0;
    }

    const total = this.avis.reduce((sum, item) => sum + (item.note || 0), 0);
    return Number((total / this.avis.length).toFixed(1));
  }

}