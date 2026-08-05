import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CommandeHeader } from './components/commande-header/commande-header';
import { CommandeFilter } from './components/commande-filter/commande-filter';
import { CommandeDashboard } from './components/commande-dashboard/commande-dashboard';
import { CommandeCard } from './components/commande-card/commande-card';
import { CommandeEmpty } from './components/commande-empty/commande-empty';
import { CommandePreview } from './components/commande-preview/commande-preview';
import { CommandeService } from '../../core/services/commandes';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [
    CommonModule,
    CommandeHeader,
    CommandeFilter,
    CommandeDashboard,
    CommandeCard,
    CommandeEmpty,
    CommandePreview
  ],
  templateUrl: './commande.html',
  styleUrl: './commande.css'
})
export class Commande implements OnInit {

  commandes: any[] = [];

  stats = {

    total: 0,

    enCours: 0,

    livrees: 0,

    depense: 0

  };

  constructor(

    private commandeService: CommandeService,
    private router: Router

  ) {}

  ngOnInit(): void {

    this.chargerCommandes();

  }

  chargerCommandes(): void {

    this.commandeService.getCommandes().subscribe({

      next: (data: any) => {

        const payload = Array.isArray(data)
          ? data
          : data.results || [];

        this.commandes = payload;

        this.calculerStatistiques();

      }

    });

  }

  appliquerFiltres(filtre: string): void {

    console.log(filtre);

  }

  calculerStatistiques(): void {

    this.stats.total = this.commandes.length;

    this.stats.enCours = this.commandes.filter(

      c =>
        c.statut === 'en_attente' ||
        c.statut === 'confirme' ||
        c.statut === 'expedie'

    ).length;

    this.stats.livrees = this.commandes.filter(

      c => c.statut === 'livre'

    ).length;

    this.stats.depense = this.commandes.reduce(

      (total, commande) =>

        total + Number(commande.montant_total),

      0

    );

  }
commandeSelectionnee: any = null;

ouvrirApercu(commande: any): void {

  this.commandeSelectionnee = commande;

}

fermerApercu(): void {

  this.commandeSelectionnee = null;

}
continuerAchats(): void {

  // À adapter selon ta route des produits
  this.router.navigate(['/produits']);

}

}