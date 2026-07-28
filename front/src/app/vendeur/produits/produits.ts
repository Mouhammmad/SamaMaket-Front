import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitHeader } from './components/produit-header/produit-header';
import { ProduitFilter } from './components/produit-filter/produit-filter';
import { ProduitTable } from './components/produit-table/produit-table';
import { ProduitFrom } from './components/produit-from/produit-from';
import { Modal } from '../../shared/modal/modal';
import { VendeurProduits } from '../../core/services/vendeur-produits';



@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, ProduitHeader, ProduitFilter, ProduitTable, ProduitFrom, Modal],
  templateUrl: './produits.html',
  styleUrl: './produits.css',
})
export class Produits implements OnInit {
  ouvrirModal = false;
  produits: any[] = [];

  constructor(private produitService: VendeurProduits) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  
loading = true;

chargerProduits() {
  this.loading = true;

  this.produitService.getProduits().subscribe({
    next: (data) => {
      this.produits = data;
      this.loading = false;
    },
    error: () => {
      this.loading = false;
    }
  });
}
  ouvrir(): void {
    this.ouvrirModal = true;
  }

  fermer(): void {
    this.ouvrirModal = false;
  }

  onProduitAjoute(): void {
    this.chargerProduits();
    this.fermer();
  }


  
}
