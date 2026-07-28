import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { PanierService } from '../services/panier.service';
import { FavorisService } from '../services/favoris.service';

@Component({
  selector: 'app-produit-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produit-detail.html',
  styleUrls: ['./produit-detail.scss']
})
export class ProduitDetailComponent implements OnInit {

  produit: any = null;
  quantite = 1;
  couleurSelectionnee = '';
  tailleSelectionnee = '';

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private panierService: PanierService,
    private favorisService: FavorisService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.produitService.getProduit(id).subscribe({
      next: (data) => {
        this.produit = data;
        // assurer rafraîchissement UI si l'application tourne sans zone.js
        try { this.cdr.detectChanges(); } catch (e) {}
      }
    });
  }

  augmenter(): void {
    this.quantite++;
  }

  diminuer(): void {
    if (this.quantite > 1) {
      this.quantite--;
    }
  }

  selectionnerCouleur(couleur: string): void {
    this.couleurSelectionnee = couleur;
  }

  selectionnerTaille(taille: string): void {
    this.tailleSelectionnee = taille;
  }

  ajouterAuPanier(): void {
    const payload = {
      produit_id: this.produit?.id,
      quantite: this.quantite
    };

    this.panierService.ajouter(payload).subscribe({
      next: () => {
        console.log('Produit ajouté au panier');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  acheter() {
    console.log('Achat immédiat du produit', this.produit);
    const payload = {
      produit_id: this.produit?.id,
      quantite: this.quantite
    };

    this.panierService.ajouter(payload).subscribe({
      next: () => {
        console.log('Produit ajouté au panier pour achat immédiat');
        window.location.href = '/paiment';
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ajouterAuxFavoris(): void {
    if (!this.produit?.id) {
      return;
    }

    this.favorisService.ajouterFavori(this.produit.id).subscribe({
      next: () => console.log('Produit ajouté aux favoris'),
      error: (err) => console.error(err)
    });
  }

}