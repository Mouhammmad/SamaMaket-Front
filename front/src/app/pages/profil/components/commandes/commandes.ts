import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeService } from '../../../../core/services/commandes';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css',
})
export class Commandes implements OnInit {

  commandes: any[] = [];
  chargement = true;
  message = '';
  stats = {
    total: 0,
    enCours: 0,
    livrees: 0,
    annulees: 0
  };

  constructor(
    private commandeService: CommandeService
  ) {}

  ngOnInit(): void {
    this.chargerCommandes();
  }

  chargerCommandes(): void {
    this.chargement = true;
    this.commandeService.getMesCommandes().subscribe({
      next: (data: any) => {
        this.commandes = Array.isArray(data) ? data : data.results || [];
        this.calculerStatistiques();
        this.chargement = false;
      },
      error: () => {
        this.message = 'Impossible de charger vos commandes pour le moment.';
        this.commandes = [];
        this.chargement = false;
      }
    });
  }

  calculerStatistiques(): void {
    this.stats.total = this.commandes.length;
    this.stats.enCours = this.commandes.filter(c => ['en_attente', 'confirme', 'expedie'].includes(c.statut)).length;
    this.stats.livrees = this.commandes.filter(c => c.statut === 'livre').length;
    this.stats.annulees = this.commandes.filter(c => c.statut === 'annule').length;
  }

  libelleStatut(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'confirme': return 'Confirmée';
      case 'expedie': return 'Expédiée';
      case 'livre': return 'Livrée';
      case 'annule': return 'Annulée';
      default: return statut || 'Inconnu';
    }
  }

}
