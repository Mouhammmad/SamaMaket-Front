import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProduitsService } from '../../services/produits';
import { Produits } from '../../models/produits';

@Component({
  selector: 'app-detail-produits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-produits.html',
  styleUrl: './detail-produits.css'
})
export class DetailProduits implements OnInit {

  produit?: Produits;

  constructor(
    private route: ActivatedRoute,
    private produitsService: ProduitsService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.produitsService.getProduit(id).subscribe({
      next: (data) => {
        this.produit = data;
      },
      error: (err) => console.error(err)
    });

  }

}