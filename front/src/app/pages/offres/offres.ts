import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  ProduitService,
  Promotion
} from '../../core/services/produit';

import { OffresCard } from './components/offres-card/offres-card';
import { OffresFiltres } from './components/offres-filtres/offres-filtres';
import { OffresFlash } from './components/offres-flash/offres-flash';
import { OffresHeader } from './components/offres-header/offres-header';
import { OffresVides } from './components/offres-vides/offres-vides';

@Component({
  selector: 'app-offres',
  standalone: true,

  imports: [
    CommonModule,
    OffresCard,
    OffresFiltres,
    OffresFlash,
    OffresHeader,
    OffresVides
  ],

  templateUrl: './offres.html',
  styleUrl: './offres.css'
})
export class Offres implements OnInit {

  private produitService = inject(ProduitService);
  private router = inject(Router);
  private changeDetectorRef = inject(ChangeDetectorRef);

  offres: Promotion[] = [];

  offresFiltrees: Promotion[] = [];

  chargement = true;

  erreur = false;


  // ==========================================
  // INITIALISATION
  // ==========================================

  ngOnInit(): void {

    this.chargerOffres();

  }


  // ==========================================
  // CHARGER LES OFFRES
  // ==========================================

  chargerOffres(): void {

    this.chargement = true;
    this.erreur = false;

    this.produitService
      .getOffres()
      .subscribe({

        next: (response) => {

          console.log(
            'Offres reçues :',
            response
          );

          this.offres = response;

          this.offresFiltrees = response;

          this.chargement = false;
          this.changeDetectorRef.markForCheck();

        },

        error: (error) => {

          console.error(
            'Erreur chargement offres :',
            error
          );

          this.offres = [];

          this.offresFiltrees = [];

          this.chargement = false;

          this.erreur = true;
          this.changeDetectorRef.markForCheck();

        }

      });

  }


  // ==========================================
  // FILTRER LES OFFRES
  // ==========================================

  filtrerOffres(offres: Promotion[]): void {

    this.offresFiltrees = offres;

  }


  // ==========================================
  // VOIR UN PRODUIT
  // ==========================================

  voirProduit(produitId: number): void {

    this.router.navigate([
      '/produit',
      produitId
    ]);

  }


  // ==========================================
  // CALCULER LE PRIX APRÈS REMISE
  // ==========================================

  calculerPrix(
    prix: string,
    offre: Promotion
  ): number {

    const prixNumber = Number(prix);

    if (
      offre.type_remise === 'pourcentage'
    ) {

      return (
        prixNumber -
        (
          prixNumber *
          Number(offre.taux_remise) /
          100
        )
      );

    }

    return Math.max(
      0,
      prixNumber -
      Number(offre.taux_remise)
    );

  }


  // ==========================================
  // AFFICHER LA REMISE
  // ==========================================

  afficherRemise(offre: Promotion): string {

    if (
      offre.type_remise === 'pourcentage'
    ) {

      return `-${offre.taux_remise}%`;

    }

    return `-${offre.taux_remise} FCFA`;

  }


  // ==========================================
  // AUCUNE OFFRE
  // ==========================================

  get aucuneOffre(): boolean {

    return (
      !this.chargement &&
      this.offresFiltrees.length === 0
    );

  }

  rechercherOffres(texte: string): void {
    const recherche = texte.trim().toLowerCase();
    this.offresFiltrees = this.offres.filter((offre) =>
      offre.boutique.toLowerCase().includes(recherche) ||
      offre.produits.some((produit) =>
        produit.nom.toLowerCase().includes(recherche)
      )
    );
  }

  filtrerTypeRemise(type: string): void {
    this.offresFiltrees = type
      ? this.offres.filter((offre) => offre.type_remise === type)
      : [...this.offres];
  }

  rechercherBoutique(nom: string): void {
    const recherche = nom.trim().toLowerCase();
    this.offresFiltrees = this.offres.filter((offre) =>
      offre.boutique.toLowerCase().includes(recherche)
    );
  }

  reinitialiserFiltres(): void {
    this.offresFiltrees = [...this.offres];
  }

}