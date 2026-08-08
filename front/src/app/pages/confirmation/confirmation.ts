import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmationHeader } from './components/confirmation-header/confirmation-header';
import { ConfirmationSummary } from './components/confirmation-summary/confirmation-summary';
import { ConfirmationProducts } from './components/confirmation-products/confirmation-products';
import { ConfirmationTracking } from './components/confirmation-tracking/confirmation-tracking';
import { ConfirmationActions } from './components/confirmation-actions/confirmation-actions';

import { CheckoutStepper } from '../../shared/checkout-stepper/checkout-stepper';

import { CommandeService } from '../../core/services/commandes';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    CheckoutStepper,
    ConfirmationHeader,
    ConfirmationSummary,
    ConfirmationProducts,
    ConfirmationTracking,
    ConfirmationActions
  ],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css'
})
export class Confirmation implements OnInit {

  commande: any = null;

  chargement = true;

  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private commandeService: CommandeService

  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.chargerCommande(+id);

    }

  }

  chargerCommande(id: number): void {

    this.commandeService.getCommande(id).subscribe({

      next: (response) => {

        this.commande = response;

        this.chargement = false;

      },

      error: () => {

        this.chargement = false;

        this.router.navigate(['/']);

      }

    });

  }
telechargerFacture(): void {

  console.log('Télécharger la facture');

}

suivreCommande(): void {

  this.router.navigate([

    '/suivi-commande',

    this.commande.id

  ]);

}

retourAccueil(): void {

  this.router.navigate([

    '/'

  ]);

}
}