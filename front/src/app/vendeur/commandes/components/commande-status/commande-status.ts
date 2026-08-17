import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-status',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './commande-status.html',
  styleUrl: './commande-status.css'
})
export class CommandeStatus implements OnChanges {

  @Input() commande: any = null;

  @Output() enregistrer = new EventEmitter<string>();

  @Output() fermer = new EventEmitter<void>();

  statut = '';
  showModal = false;

  ngOnChanges(changes: SimpleChanges) {
    console.log('[CommandeStatus] ngOnChanges - Input commande changé');
    if (changes['commande'] && this.commande && this.commande.id) {
      this.statut = this.commande.statut || 'en_attente';
      this.showModal = true;
      console.log('[CommandeStatus] ngOnChanges - Commande reçue:', {
        id: this.commande.id,
        numero: this.commande.numero,
        statutActuel: this.statut
      });
    }
  }

  onStatutChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.statut = target.value;
    console.log('[CommandeStatus] onStatutChange - Nouveau statut sélectionné:', this.statut);
  }

  sauvegarder(): void {
    console.log('[CommandeStatus] sauvegarder() - Début', {
      statut: this.statut,
      commandeId: this.commande?.id
    });

    if (!this.statut) {
      console.warn('[CommandeStatus] sauvegarder() - Statut vide, annulation');
      return;
    }

    console.log('[CommandeStatus] sauvegarder() - Émission de l\'événement enregistrer avec statut:', this.statut);
    this.enregistrer.emit(this.statut);
    console.log('[CommandeStatus] sauvegarder() - Événement émis');
  }

  fermerModal(): void {
    console.log('[CommandeStatus] fermerModal() - Fermeture du modal');
    this.showModal = false;
    this.fermer.emit();
  }

}