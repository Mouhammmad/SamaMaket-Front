import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  prenom = '';
  nom = '';
  telephone = '';
  email = '';

  adresse = '';
  ville = '';
  region = '';

  constructor(private router: Router){}

  continuer(){

    if(
      !this.prenom ||
      !this.nom ||
      !this.telephone ||
      !this.adresse
    ){

      alert("Veuillez remplir tous les champs obligatoires.");

      return;

    }

    this.router.navigate(['/paiement']);

  }

}