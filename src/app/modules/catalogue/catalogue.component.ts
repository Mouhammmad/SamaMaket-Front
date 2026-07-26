import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CatalogueService } from '../../core/services/catalogue.service';
import { PanierService } from '../../core/services/panier.service';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  produits: any[] = [];
  message = '';

  constructor(private catalogueService: CatalogueService, private panierService: PanierService, private router: Router) {}

  ngOnInit() {
    this.catalogueService.getProduits().subscribe({
      next: (data: any) => this.produits = data,
      error: (err) => console.error(err)
    });
  }

  ajouterAuPanier(produitId: number) {
    this.panierService.ajouterArticle(produitId, 1).subscribe({
      next: () => this.message = 'Produit ajouté au panier !',
      error: () => this.message = 'Erreur lors de l\'ajout'
    });
    setTimeout(() => this.message = '', 3000);
  }

  allerAuPanier() {
    this.router.navigate(['/panier']);
  }
}