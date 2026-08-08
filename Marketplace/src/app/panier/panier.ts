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
  codePromo = '';
  reductionPromo = 0;
  fraisLivraison = 2000;
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
        this.reductionPromo = 0;
        this.codePromo = '';
        this.message = '';
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
        this.total = Number(data.total ?? this.getSousTotalPanier() ?? 0);
      }
    });
  }

  diminuer(item: any): void {
    if (item.quantite > 1) {
      this.panierService.modifierQuantite(item.id, item.quantite - 1).subscribe({
        next: (data: any) => {
          this.panier = this.normaliserArticles(data.articles ?? []);
          this.total = Number(data.total ?? this.getSousTotalPanier() ?? 0);
        }
      });
    }
  }

  supprimer(item: any): void {
    this.panierService.supprimer(item.id).subscribe({
      next: (data: any) => {
        this.panier = this.normaliserArticles(data.articles ?? []);
        this.total = Number(data.total ?? this.getSousTotalPanier() ?? 0);
      }
    });
  }

  viderPanier(): void {
    this.panierService.vider().subscribe(() => {
      this.panier = [];
      this.total = 0;
    });
  }

  appliquerCodePromo(): void {
    if (!this.codePromo.trim()) {
      this.message = 'Veuillez saisir un code promo.';
      return;
    }

    this.panierService.appliquerCodePromo(this.codePromo.trim()).subscribe({
      next: (data: any) => {
        this.reductionPromo = Number(data.reduction || 0);
        this.total = Number(data.sous_total ?? this.getSousTotalPanier() ?? this.total ?? 0);
        this.message = data.message || 'Code promo appliqué';
        this.codePromo = data.code_promo || this.codePromo;
      },
      error: (err: any) => {
        this.reductionPromo = 0;
        this.total = this.getSousTotalPanier();
        this.message = err.error?.erreur || 'Code promo invalide';
      }
    });
  }

  get totalFinal(): number {
    return Math.max(this.total - this.reductionPromo + this.fraisLivraison, 0);
  }

  passerCommande(): void {
    if (!this.adresseLivraison.trim()) {
      this.message = 'Veuillez saisir une adresse de livraison.';
      return;
    }

    this.panierService.validerCommande(this.adresseLivraison, this.methodePaiement, this.codePromo.trim()).subscribe({
      next: (data: any) => {
        this.message = data.message || 'Commande créée avec succès';
        this.panier = [];
        this.total = 0;
        this.reductionPromo = 0;
        this.codePromo = '';
        this.adresseLivraison = '';
        const commandeId = data?.commande?.id;
        this.router.navigate(['/confirmation'], { queryParams: { commande_id: commandeId } });
      },
      error: (err: any) => {
        this.message = err.error?.erreur || 'Impossible de créer la commande';
      }
    });
  }

  private getSousTotalPanier(): number {
    return this.panier.reduce((sum: number, item: any) => sum + Number(item.prix || 0) * Number(item.quantite || 1), 0);
  }

  private normaliserArticles(articles: any[]): any[] {
    return (articles || []).map((article: any) => ({
      ...article,
      id: article.id,
      quantite: article.quantite ?? 1,
      nom: article.produit?.nom || article.nom || 'Produit',
      prix: article.produit?.prix ?? article.prix ?? 0,
      image: article.produit?.image_url || article.produit?.image || article.image || article.image_url || 'assets/images/no-image.png',
      boutique: article.produit?.boutique || article.boutique || ''
    }));
  }
}
