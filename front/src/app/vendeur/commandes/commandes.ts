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
  
  appliquerFiltres(filtres:any){

  console.log(filtres);

}
commandes: any[] = [];

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
commandeSelectionnee: any = null;

afficherStatut = false;
changerStatut(commande: any) {

  this.commandeSelectionnee = commande;
  console.log(commande);

  this.afficherStatut = true;

}

fermerStatut() {

  this.afficherStatut = false;

}

enregistrerStatut(statut: string) {

  this.commandeService
  .changerStatut(
    this.commandeSelectionnee.id,
    statut
  )
  .subscribe({

    next: () => {

      this.fermerStatut();

      this.chargerCommandes();

    }

  });

  this.afficherStatut = false;

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
      this.commandes = payload;
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
      c => c.statut === 'expediee'
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
