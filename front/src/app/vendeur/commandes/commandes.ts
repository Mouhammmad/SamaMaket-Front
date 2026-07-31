import { Component } from '@angular/core';
import { CommandeHeader } from './components/commande-header/commande-header';
import { CommandeFilter } from './components/commande-filter/commande-filter';
import { CommandeTable } from './components/commande-table/commande-table';

@Component({
  selector: 'app-commandes',
  imports: [CommandeHeader, CommandeFilter, CommandeTable],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css',
})
export class Commandes {
  chargerCommandes(): void {
    console.log('Actualisation des commandes');
  }
  appliquerFiltres(filtres:any){

  console.log(filtres);

}
commandes: any[] = [];

ouvrirApercu(commande: any) {

  console.log(commande);

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

  console.log(statut);

  this.afficherStatut = false;

}
}
