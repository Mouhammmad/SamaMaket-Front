import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { PanierService } from '../services/panier.service';
import { FavorisService } from '../services/favoris.service';
import { AvisService, AvisProduit } from '../services/avis.service';

@Component({
  selector: 'app-produit-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit-detail.html',
  styleUrls: ['./produit-detail.scss']
})
export class ProduitDetailComponent implements OnInit {

  produit: any = null;
  quantite = 1;
  couleurSelectionnee = '';
  tailleSelectionnee = '';
  avis: any[] = [];
  noteAvis = 5;
  commentaireAvis = '';
  avisMessage = '';

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private panierService: PanierService,
    private favorisService: FavorisService,
    private avisService: AvisService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.produitService.getProduit(id).subscribe({
      next: (data: any) => {
        this.produit = {
          ...data,
          image: data.image || data.image_url || 'assets/images/no-image.png'
        };
        this.chargerAvis();
        try { this.cdr.detectChanges(); } catch (e) {}
      }
    });
  }

  chargerAvis(): void {
    if (!this.produit?.id) {
      return;
    }

    this.avisService.getAvisProduit(this.produit.id).subscribe({
      next: (data: AvisProduit[]) => {
        this.avis = data || [];
      },
      error: () => {
        this.avis = [];
      }
    });
  }

  envoyerAvis(): void {
    if (!this.produit?.id) {
      return;
    }

    if (this.noteAvis < 1 || this.noteAvis > 5) {
      this.avisMessage = 'La note doit être comprise entre 1 et 5.';
      return;
    }

    this.avisService.ajouterAvis(this.produit.id, this.noteAvis, this.commentaireAvis).subscribe({
      next: () => {
        this.avisMessage = 'Merci pour votre avis. Il sera publié après approbation.';
        this.commentaireAvis = '';
        this.noteAvis = 5;
        this.chargerAvis();
      },
      error: (err: any) => {
        this.avisMessage = err.error?.erreur || 'Impossible d’envoyer l’avis.';
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