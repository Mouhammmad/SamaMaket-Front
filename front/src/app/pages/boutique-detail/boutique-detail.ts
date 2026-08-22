import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Boutique, BoutiqueService } from '../../core/services/boutique';
import { ClientSectionService } from '../../core/services/client-section';
import { ProduitCard } from '../produits/catalogue/components/produit-card/produit-card';

@Component({
  selector: 'app-boutique-detail',
  standalone: true,
  imports: [CommonModule, ProduitCard],
  templateUrl: './boutique-detail.html',
  styleUrl: './boutique-detail.css'
})
export class BoutiqueDetail implements OnInit {
  boutique: Boutique | null = null;
  produits: any[] = [];
  chargement = true;
  erreur = '';
  estSuivi = false;
  chargementSuivi = false;
  chargementContact = false;
  messageAction = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boutiqueService: BoutiqueService,
    private clientSectionService: ClientSectionService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isFinite(id)) {
      this.erreur = 'Identifiant de boutique invalide.';
      this.chargement = false;
      this.changeDetectorRef.markForCheck();
      return;
    }

    this.boutiqueService.getBoutique(id).subscribe({
      next: (boutique) => {
        this.boutique = boutique;
        this.chargerStatutSuivi(id);
        this.chargerProduits(id);
      },
      error: () => {
        this.erreur = 'Cette boutique est indisponible.';
        this.chargement = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private chargerStatutSuivi(id: number): void {
    this.boutiqueService.getStatutSuivi(id).subscribe({
      next: (response) => {
        this.estSuivi = response.suivi;
        if (this.boutique) {
          this.boutique.followers = response.followers;
          this.boutique.abonnes = response.followers;
        }
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.estSuivi = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  toggleSuivi(): void {
    const id = this.boutique?.id;
    if (!id || this.chargementSuivi) {
      return;
    }

    this.chargementSuivi = true;
    this.messageAction = '';
    const requete = this.estSuivi
      ? this.boutiqueService.nePlusSuivreBoutique(id)
      : this.boutiqueService.suivreBoutique(id);

    requete.subscribe({
      next: (response) => {
        this.estSuivi = response.suivi;
        if (this.boutique) {
          this.boutique.followers = response.followers;
          this.boutique.abonnes = response.followers;
        }
        this.chargementSuivi = false;
        this.messageAction = response.message;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        this.chargementSuivi = false;
        this.messageAction = error?.error?.detail || 'Connectez-vous pour suivre cette boutique.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  contacter(): void {
    const id = this.boutique?.id;
    if (!id || this.chargementContact) {
      return;
    }

    this.chargementContact = true;
    this.messageAction = '';
    this.boutiqueService.contacterBoutique(id).subscribe({
      next: () => {
        this.chargementContact = false;
        this.clientSectionService.changeSection('messages');
        this.router.navigate(['/client']);
      },
      error: (error) => {
        this.chargementContact = false;
        this.messageAction = error?.error?.detail || 'Connectez-vous pour contacter cette boutique.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private chargerProduits(id: number): void {
    this.boutiqueService.getProduitsBoutique(id).subscribe({
      next: (response) => {
        this.produits = Array.isArray(response)
          ? response
          : response?.results ?? [];
        this.chargement = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.produits = [];
        this.chargement = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  voirProduit(id: number): void {
    this.router.navigate(['/produit', id]);
  }

  retourner(): void {
    this.router.navigate(['/vendeurs']);
  }
}
