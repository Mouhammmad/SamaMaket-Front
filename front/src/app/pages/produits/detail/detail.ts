import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ProduitService } from '../../../core/services/produit';
import { PanierService } from '../../../core/services/panier';
import { FavoriService } from '../../../core/services/favori.service';
import { Produit } from '../../../core/models/produit';

import { GalerieProduit } from './components/galerie-produit/galerie-produit';
import { ProduitInfo } from './components/produit-info/produit-info';
import { ProduitTabs } from './components/produit-tabs/produit-tabs';
import { ProduitAvis } from './components/produit-avis/produit-avis';
import { ProduitsSimilaires } from './components/produits-similaires/produits-similaires';
import { AchatRapide } from './components/achat-rapide/achat-rapide';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    GalerieProduit,
    ProduitInfo,
    ProduitTabs,
    ProduitAvis,
    ProduitsSimilaires,
    AchatRapide
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class Detail implements OnInit {

  produit!: Produit;

  chargement = true;

  erreur = '';

  messagePanier = '';

  showConfirmModal = false;
  confirmModalMessage = '';
  confirmModalAction: (() => void) | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService,
    private panierService: PanierService,
    private favoriService: FavoriService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const rawId = params.get('id');
      const id = Number(rawId);
      console.log('[Detail] route param', { rawId, id });

      if (!Number.isFinite(id)) {
        console.warn('[Detail] identifiant invalide');
        this.produit = null as any;
        this.chargement = false;
        this.erreur = 'Identifiant de produit invalide.';
        return;
      }

      this.chargement = true;
      this.erreur = '';
      this.chargerProduit(id);
    });

  }

  chargerProduit(id:number){
    console.log('[Detail] chargement produit', id);

    this.produitService.getProduit(id).subscribe({

      next:(data)=>{
        console.log('[Detail] produit reçu', data);

        this.produit = data;
        this.chargement = false;
        this.cdr.detectChanges();

      },

      error:(err)=>{
        console.error('Erreur chargement produit', err);
        this.produit = null as any;
        this.chargement = false;
        this.erreur = err?.error?.detail || err?.message || 'Impossible de charger le produit. Vérifiez votre connexion ou votre session.';
        this.cdr.detectChanges();

      }

    });

  }

  ajouterAuPanier(event: any): void {
    const produitId = this.produit?.id ?? event?.produit?.id;
    const quantite = Number(event?.quantite ?? 1);

    if (!produitId) {
      this.messagePanier = 'Produit indisponible pour l’ajout au panier.';
      return;
    }

    this.messagePanier = '';

    this.panierService.ajouterProduit(produitId, quantite).subscribe({
      next: (response: any) => {
        this.messagePanier = response?.message || 'Produit ajouté au panier avec succès.';
        this.panierService.chargerNombreArticles();
      },
      error: (err: any) => {
        console.error('Erreur ajout panier depuis fiche produit', err);
        const erreur = err?.error;

        if (typeof erreur === 'string') {
          this.messagePanier = erreur;
        } else if (erreur?.detail) {
          this.messagePanier = erreur.detail;
        } else if (erreur?.erreur) {
          this.messagePanier = erreur.erreur;
        } else {
          this.messagePanier = 'Impossible d’ajouter le produit au panier.';
        }
      }
    });
  }

  acheterMaintenant(event: any): void {
    this.ajouterAuPanier(event);
    this.router.navigate(['/panier']);
  }

  ajouterAuxFavoris(event: any): void {
    const produitId = this.produit?.id ?? event?.produit?.id;
    const produitNom = this.produit?.nom ?? event?.produit?.nom ?? 'ce produit';

    if (!produitId) {
      return;
    }

    this.confirmModalMessage = `Ajouter "${produitNom}" à vos favoris ?`;
    this.confirmModalAction = () => {
      this.favoriService.toggle(produitId).subscribe({
        next: () => {
          this.messagePanier = `"${produitNom}" a été ajouté à vos favoris.`;
          this.closeConfirmModal();
        },
        error: (err: any) => {
          console.error('Erreur ajout favoris', err);
          this.messagePanier = 'Impossible d\'ajouter le produit aux favoris.';
          this.closeConfirmModal();
        }
      });
    };
    this.showConfirmModal = true;
  }

  confirmerAction(): void {
    if (this.confirmModalAction) {
      this.confirmModalAction();
    }
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.confirmModalMessage = '';
    this.confirmModalAction = null;
  }

}