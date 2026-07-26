import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvisService } from '../../core/services/avis.service';

@Component({
  selector: 'app-avis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.scss']
})
export class AvisComponent {
  produitId = 0;
  note = 5;
  commentaire = '';
  message = '';
  avis: any[] = [];

  constructor(private avisService: AvisService) {}

  soumettre() {
    this.avisService.ajouter(this.produitId, this.note, this.commentaire).subscribe({
      next: () => { this.message = 'Avis soumis avec succès !'; this.commentaire = ''; },
      error: () => this.message = 'Erreur ou avis déjà soumis'
    });
  }

  chargerAvis() {
    this.avisService.getAvisProduit(this.produitId).subscribe({
      next: (data: any) => this.avis = data
    });
  }
}