import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitCard } from '../../../catalogue/components/produit-card/produit-card';
import { ProduitService } from '../../../../../core/services/produit';

@Component({
  selector: 'app-produits-similaires',
  standalone: true,
  imports: [
    CommonModule,
    ProduitCard
  ],
  templateUrl: './produits-similaires.html',
  styleUrl: './produits-similaires.css'
})
export class ProduitsSimilaires implements OnInit {

  @Input()
  produit: any;

  @Output()
  voir = new EventEmitter<any>();

  produits: any[] = [];

  constructor(
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {

    if (this.produit) {

      this.charger();

    }

  }

  charger(): void {

    this.produitService.getProduits({

      categorie: this.produit.categorie

    }).subscribe({

      next: (response) => {

        const liste = response.results || response;

        this.produits = liste.filter(

          (p: any) => p.id !== this.produit.id

        ).slice(0,4);

      }

    });

  }

}