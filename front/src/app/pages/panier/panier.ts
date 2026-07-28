import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../core/services/panier';
import { PanierItem } from '../../core/models/panier';
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule,
  RouterLink
  ],
  templateUrl: './panier.html',
  styleUrl: './panier.css'
})
export class Panier {

  panier: PanierItem[] = [];

  constructor(private panierService: PanierService) {
    this.panier = this.panierService.getPanier();
  }

  total(): number {
    return this.panier.reduce(
      (somme, p) => somme + Number(p.prix ?? 0) * p.quantite,
      0
    );
  }
  augmenter(id: number) {

  this.panierService.augmenter(id);

  this.panier = this.panierService.getPanier();

}

  convertirPrix(prix: number | string | undefined): number {
    return Number(prix ?? 0);
  }

diminuer(id: number) {

  this.panierService.diminuer(id);

  this.panier = this.panierService.getPanier();

}

supprimer(id: number) {
  this.panierService.supprimer(id);
  this.panier = this.panierService.getPanier();
}
viderPanier(){
  this.panierService.viderPanier();
  this.panier = this.panierService.getPanier();
}
}