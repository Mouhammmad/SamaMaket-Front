import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { AdminProduitsService } from './services/admin-produits';
import { CategorieService } from '../../core/services/categorie';


@Component({
  selector: 'app-produits',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './produits.html',
  styleUrls: ['./produits.css']
})
export class Produits implements OnInit {

  /* ========================================================
     ÉTAT
     ======================================================== */

  loading = false;

  produits: any[] = [];

  produitsFiltres: any[] = [];

  categories: any[] = [];

  recherche = '';

  categorieSelectionnee = '';

  statutSelectionne = '';

  produitSelectionne: any = null;

  afficherDetail = false;

  nettoyageEnCours = false;


  /* ========================================================
     CONSTRUCTEUR
     ======================================================== */

  constructor(
    private adminProduits: AdminProduitsService,
    private categorieService: CategorieService,
    private cdr: ChangeDetectorRef
  ) {}


  /* ========================================================
     INITIALISATION
     ======================================================== */

  ngOnInit(): void {

    this.chargerProduits();

    this.chargerCategories();

  }


  /* ========================================================
     CHARGER LES PRODUITS
     ======================================================== */

  chargerProduits(): void {

    this.loading = true;

    this.adminProduits
      .getProduits()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({

        next: (data: any) => {

          console.log(
            '[Admin Produits] réponse API :',
            data
          );


          /*
           * L'API peut retourner :
           *
           * [
           *   {...},
           *   {...}
           * ]
           *
           * ou :
           *
           * {
           *   count: ...,
           *   results: [...]
           * }
           */

          if (Array.isArray(data)) {

            this.produits = data;

          } else {

            this.produits = data?.results || [];

          }


          this.produitsFiltres = [
            ...this.produits
          ];
          this.cdr.markForCheck();


          console.log(
            '[Admin Produits] produits :',
            this.produits
          );

        },

        error: (error) => {

          console.error(
            '[Admin Produits] erreur :',
            error
          );

          this.produits = [];

          this.produitsFiltres = [];
          this.cdr.markForCheck();

          alert(
            error?.error?.detail ||
            'Impossible de charger les produits.'
          );

        }

      });

  }


  /* ========================================================
     CHARGER LES CATÉGORIES
     ======================================================== */

  chargerCategories(): void {

    this.categorieService
      .getCategories()
      .subscribe({

        next: (data: any) => {

          console.log(
            '[Admin Produits] catégories :',
            data
          );


          if (Array.isArray(data)) {

            this.categories = data;

          } else {

            this.categories = data?.results || [];

          }

        },

        error: (error) => {

          console.error(
            '[Admin Produits] erreur catégories :',
            error
          );

          this.categories = [];

        }

      });

  }


  /* ========================================================
     RECHERCHE
     ======================================================== */

  filtrerRecherche(): void {

    this.appliquerFiltres();

  }


  /* ========================================================
     FILTRE CATÉGORIE
     ======================================================== */

  filtrerCategorie(): void {

    this.appliquerFiltres();

  }


  /* ========================================================
     FILTRE STATUT
     ======================================================== */

  filtrerStatut(): void {

    this.appliquerFiltres();

  }


  /* ========================================================
     APPLICATION DES FILTRES
     ======================================================== */

  appliquerFiltres(): void {

    const recherche = this.recherche
      .trim()
      .toLowerCase();


    const categorieId =
      this.categorieSelectionnee
        ? String(this.categorieSelectionnee)
        : '';


    this.produitsFiltres =
      this.produits.filter((produit: any) => {


        /* --------------------------------------------------
           RECHERCHE
           -------------------------------------------------- */

        const nom =
          String(produit.nom || '')
            .toLowerCase();


        const description =
          String(produit.description || '')
            .toLowerCase();


        const boutique =
          String(produit.boutique || '')
            .toLowerCase();


        const rechercheOK =
          !recherche ||
          nom.includes(recherche) ||
          description.includes(recherche) ||
          boutique.includes(recherche);


        /* --------------------------------------------------
           CATÉGORIE
           -------------------------------------------------- */

        const produitCategorieId =
          produit.categorie_id !== undefined &&
          produit.categorie_id !== null
            ? String(produit.categorie_id)
            : '';


        const categorieOK =
          !categorieId ||
          produitCategorieId === categorieId;


        /* --------------------------------------------------
           STATUT
           -------------------------------------------------- */

        let statutOK = true;


        if (this.statutSelectionne === 'actif') {

          statutOK =
            produit.est_actif === true;

        }


        if (this.statutSelectionne === 'inactif') {

          statutOK =
            produit.est_actif === false;

        }


        return (
          rechercheOK &&
          categorieOK &&
          statutOK
        );

      });

  }


  /* ========================================================
     RÉINITIALISER
     ======================================================== */

  reinitialiserFiltres(): void {

    this.recherche = '';

    this.categorieSelectionnee = '';

    this.statutSelectionne = '';

    this.produitsFiltres = [
      ...this.produits
    ];

  }


  /* ========================================================
     STATISTIQUES
     ======================================================== */

  get totalProduits(): number {

    return this.produits.length;

  }


  get totalProduitsActifs(): number {

    return this.produits.filter(
      produit => produit.est_actif === true
    ).length;

  }


  get totalProduitsInactifs(): number {

    return this.produits.filter(
      produit => produit.est_actif === false
    ).length;

  }


  /* ========================================================
     STOCK
     ======================================================== */

  getStockClass(produit: any): string {

    const stock =
      Number(produit.quantite_stock || 0);


    if (stock === 0) {

      return 'stock-empty';

    }


    if (stock < 5) {

      return 'stock-low';

    }


    return 'stock-ok';

  }


  getStockLabel(produit: any): string {

    const stock =
      Number(produit.quantite_stock || 0);


    if (stock === 0) {

      return 'Rupture';

    }


    if (stock < 5) {

      return 'Stock faible';

    }


    return 'Disponible';

  }


  /* ========================================================
     VOIR PRODUIT
     ======================================================== */

  voirProduit(produit: any): void {

    this.produitSelectionne = produit;

    this.afficherDetail = true;

  }


  /* ========================================================
     FERMER DÉTAIL
     ======================================================== */

  fermerDetail(): void {

    this.afficherDetail = false;

    this.produitSelectionne = null;

  }


  /* ========================================================
     ACTIVER / DÉSACTIVER
     ======================================================== */

  changerStatutProduit(produit: any): void {

    if (!produit) {

      return;

    }


    const nouvelEtat =
      !produit.est_actif;


    const action =
      nouvelEtat
        ? 'activer'
        : 'désactiver';


    const confirmation = confirm(
      `Voulez-vous vraiment ${action} le produit "${produit.nom}" ?`
    );


    if (!confirmation) {

      return;

    }


    this.adminProduits
      .changerStatutProduit(
        produit.id,
        nouvelEtat
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            '[Admin Produits] statut modifié :',
            response
          );


          /*
           * Mise à jour locale
           */

          produit.est_actif =
            nouvelEtat;


          /*
           * Si le produit affiché dans
           * la modal est le même objet,
           * son statut est également mis
           * à jour automatiquement.
           */

          this.appliquerFiltres();


          /*
           * Si un filtre est actif,
           * le produit peut disparaître
           * immédiatement de la liste.
           */

        },

        error: (error) => {

          console.error(
            '[Admin Produits] erreur statut :',
            error
          );


          alert(
            error?.error?.detail ||
            `Impossible de ${action} le produit.`
          );

        }

      });

  }


  /* ========================================================
     SUPPRIMER
     ======================================================== */

  supprimerProduit(produit: any): void {

    if (!produit) {

      return;

    }


    const confirmation = confirm(
      `Voulez-vous vraiment supprimer le produit "${produit.nom}" ?`
    );


    if (!confirmation) {

      return;

    }


    this.adminProduits
      .supprimerProduit(produit.id)
      .subscribe({

        next: () => {

          console.log(
            '[Admin Produits] produit supprimé'
          );


          this.fermerDetail();

          this.chargerProduits();

        },

        error: (error) => {

          console.error(
            '[Admin Produits] erreur suppression :',
            error
          );


          alert(
            error?.error?.detail ||
            'Impossible de supprimer ce produit.'
          );

        }

      });

  }

  nettoyerProduits(): void {
    const confirme = confirm(
      'Supprimer tous les produits sauf les IDs 61, 62, 63 et 64 ? Les lignes de commande associées seront également supprimées.'
    );
    if (!confirme || this.nettoyageEnCours) {
      return;
    }

    this.nettoyageEnCours = true;
    this.adminProduits.nettoyerProduits().pipe(
      finalize(() => this.nettoyageEnCours = false)
    ).subscribe({
      next: (resultat) => {
        alert(`${resultat.produits_supprimes} produit(s) supprimé(s).`);
        this.chargerProduits();
      },
      error: (error) => {
        alert(error?.error?.detail || 'Impossible de nettoyer les produits.');
      }
    });
  }

}