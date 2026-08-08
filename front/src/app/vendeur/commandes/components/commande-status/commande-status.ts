import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commande-status',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './commande-status.html',
  styleUrl: './commande-status.css'
})
export class CommandeStatus implements OnChanges {

  @Input() commande: any = null;

  @Output() enregistrer = new EventEmitter<string>();

  @Output() fermer = new EventEmitter<void>();

  statut = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['commande'] && this.commande) {
      this.statut = this.commande.statut || 'en_attente';
    }
  }

  sauvegarder() {
    if (!this.statut) {
      return;
    }
    this.enregistrer.emit(this.statut);
  }

}