import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitsService } from '../../../../services/produits';
import { Produits } from '../../../../models/produits';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-futur-produits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './futur-produits.html',
  styleUrl: './futur-produits.css',
})
export class FuturProduits implements OnInit {

  produits: Produits[] = [];

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    this.produitsService.getProduits().subscribe({
      next: (data) => {
  this.produits = data;

  console.log('Nombre :', this.produits.length);
  console.log(this.produits);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}