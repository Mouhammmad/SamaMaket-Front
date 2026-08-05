import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-stepper.html',
  styleUrl: './checkout-stepper.css'
})
export class CheckoutStepper {

  @Input() etapeActive = 1;

  etapes = [

    {
      numero: 1,
      titre: 'Panier'
    },

    {
      numero: 2,
      titre: 'Livraison'
    },

    {
      numero: 3,
      titre: 'Paiement'
    },

    {
      numero: 4,
      titre: 'Confirmation'
    }

  ];

}