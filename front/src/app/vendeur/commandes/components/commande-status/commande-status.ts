import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class CommandeStatus {

  @Input() commande: any = null;

  @Output() enregistrer = new EventEmitter<string>();

  @Output() fermer = new EventEmitter<void>();

  statut = '';

  ngOnChanges() {
    if (this.commande) {
      this.statut = this.commande.statut;
    }
  }

  sauvegarder() {
    this.enregistrer.emit(this.statut);
  }

}