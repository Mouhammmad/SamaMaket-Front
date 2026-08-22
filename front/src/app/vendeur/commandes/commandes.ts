import { Component, ChangeDetectorRef } from '@angular/core';
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
  this.afficherStatut = false;
  this.commandeService.getMesCommandesVendeur().subscribe({
    next: (data: any) => {
      const cmd = Array.isArray(data) ? data.find((c: any) => c.id === commande.id) : data.results?.find((c: any) => c.id === commande.id);
      this.commandePreview = cmd || null;
      this.afficherPreview = true;
      this.cdr.detectChanges();
    }
  });

}

fermerPreview() {

  this.afficherPreview = false;
  this.afficherStatut = false;
  this.cdr.detectChanges();

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
    console.log('[Commandes] changerStatut() - Clic sur le bouton statut pour commande:', commande?.id);
    console.log('[Commandes] Données de la commande reçues:', {
      id: commande?.id,
      numero: commande?.numero,
      statutActuel: commande?.statut
    });

    if (!commande?.id) {
      console.error('[Commandes] ID de commande manquant');
      return;
    }

    console.log('[Commandes] Fermeture de la preview');
    this.afficherPreview = false;
    this.cdr.detectChanges();

    this.commandeSelectionnee = { ...(commande || {}) };
    this.statusMessage = '';

    setTimeout(() => {
      console.log('[Commandes] Ouverture du modal statut');
      this.afficherStatut = true;
      this.cdr.detectChanges();
      console.log('[Commandes] Modal ouvert - commandeSelectionnee:', this.commandeSelectionnee);
    }, 100);
  }

fermerStatut() {
  console.log('[Commandes] fermerStatut() - Fermeture du modal statut');
  this.afficherStatut = false;
  this.afficherPreview = false;
  this.commandeSelectionnee = null;
  this.statusMessage = '';
  this.cdr.detectChanges();
}
  private synchroniserCommandeVue(commandeId: number, statutFinal: string, commandeServeur: any = null) {
    const commandeMaj = commandeServeur ? { ...commandeServeur, statut: statutFinal } : { statut: statutFinal };

    this.commandeSelectionnee = {
      ...(this.commandeSelectionnee || {}),
      ...commandeMaj,
      statut: statutFinal
    };

    if (this.commandePreview && Number(this.commandePreview.id) === commandeId) {
      this.commandePreview = {
        ...this.commandePreview,
        ...commandeMaj,
        statut: statutFinal
      };
    }

    this.commandesSource = this.commandesSource.map((commande: any) =>
      Number(commande.id) === commandeId ? { ...commande, ...commandeMaj, statut: statutFinal } : commande
    );
    this.commandes = this.commandesSource;
  }
enregistrerStatut(statut: string) {

  console.log('[Commandes] enregistrerStatut() - Début avec statut:', statut);
  console.log('[Commandes] commandeSelectionnee:', this.commandeSelectionnee);

  if (!this.commandeSelectionnee?.id) {
    console.error('[Commandes] ID de commande manquant');
    this.statusMessage = 'Impossible de mettre à jour : commande introuvable.';
    return;
  }

  const commandeId = Number(this.commandeSelectionnee.id);
  console.log('[Commandes] Appel API pour changer statut - Commande:', commandeId, 'Statut:', statut);

  this.commandeService
  .changerStatut(
    commandeId,
    statut
  )
  .subscribe({

    next: (commandeMiseAJour: any) => {
      console.log('[Commandes] Réponse API reçue:', commandeMiseAJour);
      const commandeServeur = commandeMiseAJour || { ...this.commandeSelectionnee, statut };
      const statutFinal = commandeServeur.statut || statut;

      this.synchroniserCommandeVue(commandeId, statutFinal, commandeServeur);
      this.appliquerFiltres(this.filtresActifs);
      this.calculerStatistiques();
      this.statusMessage = 'Statut mis à jour avec succès.';
      console.log('[Commandes] Statut mis à jour localement');
      this.cdr.detectChanges();

      // Recharger complètement la liste depuis l'API
      console.log('[Commandes] Chargement complet du tableau depuis l\'API');
      this.commandeService.getMesCommandesVendeur().subscribe({
        next: (data: any) => {
          const payload = Array.isArray(data) ? data : data.results || [];
          // Trier par date de création décroissante
          const sorted = payload.sort((a: any, b: any) => {
            const dateA = new Date(a.date_creation || a.date || 0).getTime();
            const dateB = new Date(b.date_creation || b.date || 0).getTime();
            return dateB - dateA;
          });
          this.commandesSource = sorted;
          this.commandes = sorted;
          this.appliquerFiltres(this.filtresActifs);
          this.calculerStatistiques();
          console.log('[Commandes] Tableau rechargé depuis l\'API, total:', this.commandes.length);
          this.cdr.detectChanges();

          // Fermer le modal après le rechargement
          setTimeout(() => {
            console.log('[Commandes] Fermeture du modal après rechargement');
            this.fermerStatut();
          }, 300);
        },
        error: (err: any) => {
          console.error('[Commandes] Erreur lors du rechargement du tableau:', err);
          // Fermer quand même après erreur
          setTimeout(() => {
            this.fermerStatut();
          }, 300);
        }
      });
    },
    error: (err: any) => {
      console.error('[Commandes] Erreur lors de la mise à jour du statut:', err);
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
    private commandeService: CommandeService,
    private cdr: ChangeDetectorRef
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
      // Trier par date de création décroissante (nouvelles en haut)
      const sorted = payload.sort((a: any, b: any) => {
        const dateA = new Date(a.date_creation || a.date || 0).getTime();
        const dateB = new Date(b.date_creation || b.date || 0).getTime();
        return dateB - dateA; // Décroissant
      });
      this.commandesSource = sorted;
      this.commandes = sorted;
      this.appliquerFiltres(this.filtresActifs);
      this.calculerStatistiques();
      this.cdr.detectChanges();
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
