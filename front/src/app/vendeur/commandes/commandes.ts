import { Component } from '@angular/core';
import { CommandeHeader } from './components/commande-header/commande-header';
import { CommandeFilter } from './components/commande-filter/commande-filter';
import { CommandeTable } from './components/commande-table/commande-table';
import { CommandeStatus } from './components/commande-status/commande-status';
import { CommandeDashboard } from './components/commande-dashboard/commande-dashboard';
import { CommandePreview } from './components/commande-preview/commande-preview';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { CommandeService } from '../../core/services/commandes';
@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [
    CommonModule,
    CommandeHeader,
    CommandeFilter,
    CommandeTable,
    CommandeStatus,
    CommandeDashboard,
    CommandePreview
  ],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css'
})
export class Commandes implements OnInit {

  commandes: any[] = [];

  commandesSource: any[] = [];

  filtresActifs: any = {};
  
  appliquerFiltres(filtres: any = {}) {

    this.filtresActifs = filtres || {};

    const recherche = (this.filtresActifs.recherche || '').toString().trim().toLowerCase();
    const statut = (this.filtresActifs.statut || '').toString().trim().toLowerCase();
    const paiement = (this.filtresActifs.paiement || '').toString().trim().toLowerCase();
    const dateDebut = this.filtresActifs.dateDebut || '';
    const dateFin = this.filtresActifs.dateFin || '';

    this.commandes = this.commandesSource.filter((commande: any) => {
      const numero = (commande.numero || '').toString().toLowerCase();
      const client = (commande.client || '').toString().toLowerCase();
      const rechercheOk = !recherche || numero.includes(recherche) || client.includes(recherche);

      const statutCommande = (commande.statut || '').toString().toLowerCase();
      const statutOk = !statut || statutCommande === statut;

      const modePaiement = (commande.mode_paiement || commande.paiement?.methode || '').toString().toLowerCase();
      const paiementOk = !paiement || modePaiement.includes(paiement);

      const dateCommande = commande.date_creation || commande.date || '';
      const dateValue = dateCommande ? new Date(dateCommande) : null;
      const debutOk = !dateDebut || !dateValue || dateValue >= new Date(dateDebut);
      const finOk = !dateFin || !dateValue || dateValue <= new Date(dateFin);

      return rechercheOk && statutOk && paiementOk && debutOk && finOk;
    });

}

commandePreview: any = null;

afficherPreview = false;

ouvrirApercu(commande: any) {
  this.commandeService.getCommandeVendeur(commande.id).subscribe({
    next: (data) => {
      this.commandePreview = data;
      this.afficherPreview = true;
    }
  });

}

fermerPreview() {

  this.afficherPreview = false;

}



ouvrirFacture(commande: any) {

  console.log(commande);

}

supprimerCommande(commande: any) {
  if (!commande?.id) {
    return;
  }

  this.commandeService.supprimerCommande(commande.id).subscribe({
    next: () => {
      this.commandesSource = this.commandesSource.filter((item: any) => item.id !== commande.id);
      this.commandes = this.commandesSource;
      this.appliquerFiltres(this.filtresActifs);
      this.calculerStatistiques();
      this.chargerDashboard();
    }
  });
}
commandeSelectionnee: any = null;
  statusMessage = '';

afficherStatut = false;
changerStatut(commande: any) {
    console.log('ouvrir modal statut pour commande', commande?.id);
    this.commandeSelectionnee = { ...(commande || {}) };
    this.statusMessage = '';
    this.afficherStatut = true;
  }
fermerStatut() {

  this.afficherStatut = false;

}

enregistrerStatut(statut: string) {

  if (!this.commandeSelectionnee?.id) {
    this.statusMessage = 'Impossible de mettre à jour : commande introuvable.';
    return;
  }

  const commandeId = Number(this.commandeSelectionnee.id);

  this.commandeService
  .changerStatut(
    commandeId,
    statut
  )
  .subscribe({

    next: (commandeMiseAJour: any) => {
      console.log('Statut mis à jour', commandeMiseAJour);
      const commandeServeur = commandeMiseAJour || { ...this.commandeSelectionnee, statut };
      const statutFinal = commandeServeur.statut || statut;

      this.commandeSelectionnee = { ...this.commandeSelectionnee, statut: statutFinal };
      this.commandePreview = this.commandePreview && Number(this.commandePreview.id) === commandeId
        ? { ...this.commandePreview, ...commandeServeur, statut: statutFinal }
        : this.commandePreview;
      this.commandesSource = this.commandesSource.map((commande: any) =>
        Number(commande.id) === commandeId ? { ...commande, ...commandeServeur, statut: statutFinal } : commande
      );
      // Mettre à jour localement puis recharger depuis le serveur pour garantir
      // que l'interface reflète exactement l'état du backend.
      this.commandes = this.commandesSource;
      this.appliquerFiltres(this.filtresActifs);
      this.calculerStatistiques();
      this.statusMessage = 'Statut mis à jour avec succès.';

      // Recharger la liste depuis l'API pour s'assurer que l'affichage est à jour
      // (utile si d'autres champs ont été modifiés côté serveur).
      this.chargerCommandes();

      // Fermer le modal de statut après un court délai pour laisser Angular
      // appliquer les mises à jour et éviter que l'overlay n'intercepte
      // immédiatement d'autres interactions automatisées.
      setTimeout(() => this.fermerStatut(), 150);
    },
    error: (err: any) => {
      console.error('Impossible de mettre à jour le statut', err);
      this.statusMessage = err.error?.detail || err.error?.erreur || 'Impossible de mettre à jour le statut.';
    }
  });

}

stats = {

  total: 0,

  en_attente: 0,

  expediees: 0,

  revenus: 0

};
constructor(
    private commandeService: CommandeService
) {

}
ngOnInit(): void {

    this.chargerCommandes();
    this.chargerDashboard();

    

}
chargerCommandes() {

  this.commandeService.getMesCommandesVendeur().subscribe({
    next: (data: any) => {
      const payload = Array.isArray(data) ? data : data.results || [];
      this.commandesSource = payload;
      this.commandes = payload;
      this.appliquerFiltres(this.filtresActifs);
      this.calculerStatistiques();
    }
  });

}
calculerStatistiques() {

  this.stats.total = this.commandes.length;

  this.stats.en_attente =
    this.commandes.filter(
      c => c.statut === 'en_attente'
    ).length;

  this.stats.expediees =
    this.commandes.filter(
      c => c.statut === 'expedie'
    ).length;

  this.stats.revenus =
    this.commandes.reduce(
      (total: number, c: any) =>
        total + Number(c.total || 0),
      0
    );

}
chargerDashboard() {

  this.commandeService
      .dashboard()
      .subscribe({

        next: (data: any) => {

          this.stats = {

            total: data.total_commandes,

            en_attente: data.en_attente,

            expediees: data.expediees,

            revenus: data.chiffre_affaires

          };

        }

      });

}
}
