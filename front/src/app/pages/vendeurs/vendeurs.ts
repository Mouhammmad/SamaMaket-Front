import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

import { BoutiqueService, Boutique } from '../../core/services/boutique';

import { VendeurCard } from './components/vendeur-card/vendeur-card';
import { VendeurHeader } from './components/vendeur-header/vendeur-header';
import { VendeurSearch } from './components/vendeur-search/vendeur-search';
import { VendeursFiltres } from './components/vendeur-filtres/vendeur-filtres';

@Component({
  selector: 'app-vendeurs',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    VendeurCard,
    VendeurHeader,
    VendeurSearch,
    VendeursFiltres
  ],

  templateUrl: './vendeurs.html',
  styleUrl: './vendeurs.css'
})
export class Vendeurs implements OnInit {

  // ==========================================================
  // BOUTIQUES
  // ==========================================================

  boutiques: Boutique[] = [];

  boutiquesFiltrees: Boutique[] = [];

  // ==========================================================
  // CHARGEMENT
  // ==========================================================

  chargement = true;

  erreur = false;

  messageErreur = 'Veuillez réessayer dans quelques instants.';

  // ==========================================================
  // RECHERCHE
  // ==========================================================

  recherche = '';

  // ==========================================================
  // FILTRES
  // ==========================================================

  villeSelectionnee = '';

  tri = 'recent';

  // ==========================================================
  // CONSTRUCTEUR
  // ==========================================================

  constructor(
    private boutiqueService: BoutiqueService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  // ==========================================================
  // INITIALISATION
  // ==========================================================

  ngOnInit(): void {

    this.chargerVendeurs();

  }

  // ==========================================================
  // CHARGER LES BOUTIQUES
  // ==========================================================

  chargerVendeurs(): void {

    this.chargement = true;
    this.erreur = false;

    this.boutiqueService
      .getBoutiques()
      .pipe(timeout(8000))
      .subscribe({

        next: (response) => {

          console.log(
            'Boutiques disponibles :',
            response
          );

          this.boutiques = Array.isArray(response)
            ? response
            : (response as any)?.results ?? [];

          this.boutiquesFiltrees = [
            ...this.boutiques
          ];

          this.chargement = false;

          this.appliquerFiltres();
          this.changeDetectorRef.markForCheck();

        },

        error: (error) => {

          console.error(
            'Erreur chargement vendeurs :',
            error
          );

          this.boutiques = [];

          this.boutiquesFiltrees = [];

          this.messageErreur =
            'Le serveur est indisponible ou la requête a expiré.';

          this.chargement = false;

          this.erreur = true;
          this.changeDetectorRef.markForCheck();

        }

      });

  }

  // ==========================================================
  // RECHERCHE
  // ==========================================================

  rechercher(texte: string): void {

    this.recherche = texte;

    this.appliquerFiltres();

  }

  // ==========================================================
  // FILTRE VILLE
  // ==========================================================

  filtrerVille(ville: string): void {

    this.villeSelectionnee = ville;

    this.appliquerFiltres();

  }

  // ==========================================================
  // TRI
  // ==========================================================

  changerTri(tri: string): void {

    this.tri = tri;

    this.appliquerFiltres();

  }

  // ==========================================================
  // APPLIQUER LES FILTRES
  // ==========================================================

  appliquerFiltres(): void {

    let resultat = [
      ...this.boutiques
    ];

    // --------------------------------------------------------
    // RECHERCHE
    // --------------------------------------------------------

    const recherche = this.recherche
      .trim()
      .toLowerCase();

    if (recherche) {

      resultat = resultat.filter(
        boutique => {

          const nom =
            boutique.nom?.toLowerCase() || '';

          const description =
            boutique.description?.toLowerCase() || '';

          const ville =
            boutique.ville?.toLowerCase() || '';

          const categorie =
            boutique.categorie?.toLowerCase() || '';

          return (
            nom.includes(recherche) ||
            description.includes(recherche) ||
            ville.includes(recherche) ||
            categorie.includes(recherche)
          );

        }
      );

    }

    // --------------------------------------------------------
    // FILTRE VILLE
    // --------------------------------------------------------

    if (this.villeSelectionnee) {

      resultat = resultat.filter(
        boutique =>
          boutique.ville === this.villeSelectionnee
      );

    }

    // --------------------------------------------------------
    // TRI
    // --------------------------------------------------------

    switch (this.tri) {

      case 'note':

        resultat.sort(
          (a, b) =>
            (b.note || 0) - (a.note || 0)
        );

        break;

      case 'followers':

        resultat.sort(
          (a, b) =>
            (b.followers || 0) -
            (a.followers || 0)
        );

        break;

      case 'ventes':

        resultat.sort(
          (a, b) =>
            (b.ventes || 0) -
            (a.ventes || 0)
        );

        break;

      case 'nom':

        resultat.sort(
          (a, b) =>
            a.nom.localeCompare(b.nom)
        );

        break;

      case 'recent':
      default:

        // Pour le moment on conserve
        // l'ordre envoyé par Django.

        break;

    }

    this.boutiquesFiltrees = resultat;

  }

  // ==========================================================
  // VILLES DISPONIBLES
  // ==========================================================

  get villes(): string[] {

    const villes = this.boutiques
      .map(boutique => boutique.ville)
      .filter(
        ville => !!ville
      );

    return [
      ...new Set(villes)
    ].sort();

  }

  // ==========================================================
  // NOMBRE DE VENDEURS
  // ==========================================================

  get nombreVendeurs(): number {

    return this.boutiques.length;

  }

  // ==========================================================
  // RÉINITIALISER LES FILTRES
  // ==========================================================

  reinitialiserFiltres(): void {

    this.recherche = '';

    this.villeSelectionnee = '';

    this.tri = 'recent';

    this.appliquerFiltres();

  }

  // ==========================================================
  // RAFRAÎCHIR
  // ==========================================================

  actualiser(): void {

    this.chargerVendeurs();

  }

  ouvrirBoutique(id: number): void {

    this.router.navigate(['/boutique', id]);

  }

}