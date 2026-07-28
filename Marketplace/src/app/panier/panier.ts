import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panier.html',
  styleUrls: ['./panier.scss']
})
export class PanierComponent implements OnInit {

  panier: any[] = [];
  total = 0;
  produitsSuggeres: any[] = [];
  adresseLivraison = '';
  methodePaiement = 'wave';
  message = '';

  constructor(private panierService: PanierService, private router: Router) {}

  ngOnInit(): void {
    this.chargerPanier();
  }

  chargerPanier(): void {
    this.panierService.getPanier().subscribe({
      next: (data: any) => {
        this.panier = this.normaliserArticles(data.articles ?? []);
        this.total = data.total ?? 0;
      },
      error: () => {
        this.panier = [];
        this.total = 0;
      }
    });
  }

  augmenter(item: any): void {
    this.panierService.modifierQuantite(item.id, item.quantite + 1).subscribe({
      next: (data: any) => {
        this.panier = this.normaliserArticles(data.articles ?? []);
        this.total = data.total ?? 0;
      }
    });
  }

  diminuer(item: any): void {
    if (item.quantite > 1) {
      this.panierService.modifierQuantite(item.id, item.quantite - 1).subscribe({
        next: (data: any) => {
          this.panier = this.normaliserArticles(data.articles ?? []);
          this.total = data.total ?? 0;
        }
      });
    }
  }

  supprimer(item: any): void {
    this.panierService.supprimer(item.id).subscribe({
      next: (data: any) => {
        this.panier = this.normaliserArticles(data.articles ?? []);
        this.total = data.total ?? 0;
      }
    });
  }

  viderPanier(): void {
    this.panierService.vider().subscribe(() => {
      this.panier = [];
      this.total = 0;
    });
  }

  passerCommande(): void {
    if (!this.adresseLivraison.trim()) {
      this.message = 'Veuillez saisir une adresse de livraison.';
      return;
    }

    this.panierService.validerCommande(this.adresseLivraison, this.methodePaiement).subscribe({
      next: (data: any) => {
        this.message = data.message || 'Commande créée avec succès';
        this.panier = [];
        this.total = 0;
        this.adresseLivraison = '';
        this.router.navigate(['/paiment']);
      },
      error: (err: any) => {
        this.message = err.error?.erreur || 'Impossible de créer la commande';
      }
    });
  }

  private normaliserArticles(articles: any[]): any[] {
    return (articles || []).map((article: any) => ({
      ...article,
      id: article.id,
      quantite: article.quantite ?? 1,
      nom: article.produit?.nom || article.nom || 'Produit',
      prix: article.produit?.prix ?? article.prix ?? 0,
      image: article.produit?.image || article.image || article.image_url || 'assets/images/no-image.png',
      boutique: article.produit?.boutique || article.boutique || ''
    }));
  }
}
