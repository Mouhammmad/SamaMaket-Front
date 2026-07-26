import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LivraisonService } from '../../core/services/livraison.service';

@Component({
  selector: 'app-livraison',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent {
  numeroSuivi = '';
  livraison: any = null;
  erreur = '';

  constructor(private livraisonService: LivraisonService) {}

  suivre() {
    this.erreur = '';
    this.livraisonService.suivre(this.numeroSuivi).subscribe({
      next: (data: any) => this.livraison = data,
      error: () => this.erreur = 'Livraison introuvable'
    });
  }

  getStatutIndex(statut: string): number {
    const statuts = ['en_preparation', 'expedie', 'en_transit', 'livre'];
    return statuts.indexOf(statut);
  }
}