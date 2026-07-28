import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Produit } from '../../core/models/produit';

@Component({
  selector: 'app-carte-produit',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './carte-produit.html',
  styleUrl: './carte-produit.css'
})
export class CarteProduit {

  @Input({ required: true })
  produit!: Produit;

}