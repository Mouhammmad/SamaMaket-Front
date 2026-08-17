import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProduitsService } from './services/admin-produits';
import { ProduitAdmin } from './models/admin-produits';

@Component({
  selector: 'app-admin-produits',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './produits.html',
  styleUrl: './produits.css'
})
export class Produits implements OnInit {

  produits: ProduitAdmin[] = [];

  chargement = true;

  constructor(
    private produitService: AdminProduitsService
  ) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits() {

    this.produitService.getProduits().subscribe({

      next: (data: any) => {

        this.produits = data.results ?? data;

        this.chargement = false;

      },

      error: () => {

        this.chargement = false;

      }

    });

  }

}