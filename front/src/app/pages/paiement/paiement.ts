import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PaiementHeader } from './components/paiement-header/paiement-header';
import { PaiementMethods } from './components/paiement-methods/paiement-methods';
import { CheckoutStepper } from '../../shared/checkout-stepper/checkout-stepper';
import { PanierSummary } from '../panier/components/panier-summary/panier-summary';

import { CommandeService } from '../../core/services/commandes';
import { PanierService } from '../../core/services/panier';
import { ClientSectionService } from '../../core/services/client-section';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [
    CommonModule,
    PaiementHeader,
    PaiementMethods,
    CheckoutStepper,
    PanierSummary
  ],
  templateUrl: './paiement.html',
  styleUrl: './paiement.css'
})
export class Paiement implements OnInit {

  methodePaiement: any = null;

  adresse: any = null;

  transport: any = null;

  sousTotal = 0;

  reduction = 0;

  livraison = 0;

  total = 0;

  chargement = false;

  constructor(

    private commandeService: CommandeService,
    private panierService: PanierService,
    private router: Router,
    private sectionService: ClientSectionService

  ) {}

  ngOnInit(): void {
    this.adresse = JSON.parse(localStorage.getItem('checkoutAdresse') || 'null');
    this.transport = JSON.parse(localStorage.getItem('checkoutTransport') || 'null');
    this.livraison = Number(this.transport?.prix || 0);
    this.chargerPanier();
  }

  chargerPanier(): void {
    this.panierService.getPanier().subscribe({
      next: (panier: any) => {
        this.sousTotal = Number(panier?.total || 0);
        this.total = this.sousTotal + this.livraison - this.reduction;
      },
      error: () => {
        this.sousTotal = 0;
        this.total = 0;
      }
    });
  }

  choisirMethode(methode: any): void {

    this.methodePaiement = methode;

  }

  calculerTotal(): void {

    this.total =

      this.sousTotal

      - this.reduction

      + this.livraison;

  }

  payer(): void {

    if (!this.methodePaiement) {

      alert('Veuillez choisir un moyen de paiement.');

      return;

    }

    if (!this.adresse) {
      alert('Veuillez renseigner votre adresse de livraison.');
      return;
    }

    if (!['wave', 'orange_money'].includes(this.methodePaiement.id)) {
      alert('Veuillez choisir un moyen de paiement supporté : Wave ou Orange Money.');
      return;
    }

    this.chargement = true;

    const adresseLivraison = [
      this.adresse.prenom,
      this.adresse.nom,
      this.adresse.telephone,
      this.adresse.adresse,
      this.adresse.ville,
      this.adresse.pays
    ].filter(Boolean).join(', ');

    this.commandeService.validerPanier({
      adresse_livraison: adresseLivraison,
      methode_paiement: this.methodePaiement.id
    }).subscribe({

      next: (response) => {

        this.chargement = false;

        const commandeId = response?.commande?.id || response?.id;

        if (!commandeId) {
          alert('Commande créée, mais l’identifiant n’a pas été renvoyé.');
          return;
        }

        localStorage.removeItem('checkoutAdresse');
        localStorage.removeItem('checkoutTransport');

        // redirige directement vers l'espace client et ouvre la section "commandes"
        this.sectionService.changeSection('commandes');
        this.router.navigate(['/client']);

      },

      error: (err) => {

        this.chargement = false;

        console.error(err);

        const message = err?.error?.erreur || err?.error?.detail || 'Une erreur est survenue.';

        alert(message);

      }

    });

  }

}