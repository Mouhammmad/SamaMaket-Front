import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LivraisonHeader } from './components/livraison-header/livraison-header';
import { CheckoutStepper } from '../../shared/checkout-stepper/checkout-stepper';
import { AdresseForm } from './components/adresse-form/adresse-form';
import { TransportSelector } from './components/transport-selector/transport-selector';
import { PanierSummary } from '../panier/components/panier-summary/panier-summary';
import { PanierService } from '../../core/services/panier';

@Component({
  selector: 'app-livraison',
  standalone: true,
  imports: [
    CommonModule,
    LivraisonHeader,
    CheckoutStepper,
    AdresseForm,
    TransportSelector,
    PanierSummary
  ],
  templateUrl: './livraison.html',
  styleUrl: './livraison.css'
})
export class Livraison implements OnInit {

  adresse: any = null;

  transport: any = null;

  sousTotal = 0;

  reduction = 0;

  livraison = 1500;

  total = 0;

  codePromo = '';

  constructor(
    private router: Router,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
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

  enregistrerAdresse(adresse: any): void {

    this.adresse = adresse;

    console.log('Adresse :', adresse);

  }

  choisirTransport(mode: any): void {

    this.transport = mode;

    this.livraison = Number(mode?.prix || 0);

    this.calculerTotal();

  }

  calculerTotal(): void {

    this.total =

      this.sousTotal

      - this.reduction

      + this.livraison;

  }

  passerPaiement(): void {
    if (!this.adresse) {
      alert('Veuillez renseigner votre adresse de livraison.');
      return;
    }

    if (!this.transport) {
      alert('Veuillez choisir un mode de livraison.');
      return;
    }

    localStorage.setItem('checkoutAdresse', JSON.stringify(this.adresse));
    localStorage.setItem('checkoutTransport', JSON.stringify(this.transport));

    this.router.navigate(['/paiement']);

  }

  continuerAchats(): void {

    this.router.navigate(['/produits']);

  }

}