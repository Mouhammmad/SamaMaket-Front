import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../core/services/produit';
import { Produit } from '../../core/models/produit';
import { CarteProduit } from '../../shared/carte-produit/carte-produit';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, CarteProduit],
  templateUrl: './produits.html',
  styleUrl: './produits.css'
})
export class Produits implements OnInit {

  produits: Produit[] = [];

  constructor(
    private produitService: ProduitService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.produitService.getProducts().subscribe({
      next: (data) => {
        console.log('PAGE PRODUITS');
        console.log(data);

        const payload = Array.isArray(data) ? data : (data as { results?: Produit[] })?.results ?? [];
        this.produits = [...payload];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits', err);
      }
    });
  }

}