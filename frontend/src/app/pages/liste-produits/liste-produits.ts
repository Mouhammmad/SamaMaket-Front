import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProduitsService } from '../../services/produits';
import { Produits } from '../../models/produits';

@Component({
  selector: 'app-liste-produits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './liste-produits.html',
  styleUrl: './liste-produits.css',
})
export class ListeProduits implements OnInit {

  produits: Produits[] = [];

  constructor(
    private produitsService: ProduitsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

  this.produits = [
    {
      id: 1,
      nom: 'Produit Test',
      description: 'Test',
      prix: '1000',
      image: '',
      image_url: 'http://127.0.0.1:8000/media/produits/demo.jpg',
      categorie: 'Test',
      boutique_id: 1,
      boutique: 'Boutique Test',
      est_actif: true,
      date_creation: ''
    }
  ];

  console.log(this.produits);

}
}