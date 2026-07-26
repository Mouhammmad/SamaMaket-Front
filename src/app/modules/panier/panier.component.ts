import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanierService } from '../../core/services/panier.service';
import { PromotionService } from '../../core/services/promotion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  panier: any = null;
  codePromo: string = '';
  promoAppliquee: any = null;
  erreurPromo: string = '';

  constructor(
    private panierService: PanierService,
    private promotionService: PromotionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.chargerPanier();
  }

  chargerPanier() {
    this.panierService.getPanier().subscribe({
      next: (data: any) => {
        this.panier = data;
        console.log('Panier chargé:', data);
      },
      error: (err) => console.error(err)
    });
  }

  modifierQuantite(articleId: number, quantite: number) {
    this.panierService.modifierQuantite(articleId, quantite).subscribe({
      next: (data: any) => this.panier = data,
      error: (err) => console.error(err)
    });
  }

  supprimerArticle(articleId: number) {
    this.panierService.supprimerArticle(articleId).subscribe({
      next: (data: any) => this.panier = data,
      error: (err) => console.error(err)
    });
  }

  viderPanier() {
    this.panierService.viderPanier().subscribe({
      next: () => this.chargerPanier(),
      error: (err) => console.error(err)
    });
  }

  appliquerPromo() {
    this.erreurPromo = '';
    this.promotionService.appliquer(this.codePromo).subscribe({
      next: (data: any) => this.promoAppliquee = data,
      error: () => this.erreurPromo = 'Code promo invalide ou expiré'
    });
  }

  calculerTotal() {
    if (!this.panier) return 0;
    let total = this.panier.total;
    if (this.promoAppliquee) {
      if (this.promoAppliquee.type_remise === 'pourcentage') {
        total -= total * (this.promoAppliquee.taux_remise / 100);
      } else {
        total -= this.promoAppliquee.taux_remise;
      }
    }
    return total;
  }

  passerCommande() {
    this.router.navigate(['/paiement']);
  }
}