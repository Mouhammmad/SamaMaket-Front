import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, timeout } from 'rxjs';

import {
  AdminService,
  AdminBoutique
} from '../../core/services/admin.service';

@Component({
  selector: 'app-admin-vendeurs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './vendeurs.html',
  styleUrl: './vendeurs.css'
})
export class Vendeurs implements OnInit {

  private adminService = inject(AdminService);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  boutiques: AdminBoutique[] = [];

  boutiquesFiltrees: AdminBoutique[] = [];

  recherche = '';

  filtreStatut = 'tous';

  chargement = true;

  erreur = '';


  // =====================================================
  // INITIALISATION
  // =====================================================

  ngOnInit(): void {

    this.chargerBoutiques();

  }


  // =====================================================
  // CHARGER LES BOUTIQUES
  // =====================================================

  chargerBoutiques(): void {

    this.chargement = true;
    this.erreur = '';

    this.adminService
      .getBoutiques()
      .pipe(
        timeout(10000),
        finalize(() => {
          this.chargement = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({

        next: (boutiques) => {

          this.boutiques = boutiques;

          this.boutiquesFiltrees = [
            ...boutiques
          ];

          this.changeDetector.markForCheck();

        },

        error: (error) => {

          console.error(
            'Erreur chargement vendeurs :',
            error
          );

          this.erreur =
            'Impossible de charger les vendeurs.';

          this.changeDetector.markForCheck();

        }

      });

  }


  // =====================================================
  // RECHERCHE + FILTRE
  // =====================================================

  filtrer(): void {

    let resultat =
      [...this.boutiques];


    // Recherche

    if (this.recherche.trim()) {

      const recherche =
        this.recherche
          .trim()
          .toLowerCase();

      resultat =
        resultat.filter(boutique =>

          boutique.nom
            ?.toLowerCase()
            .includes(recherche)

          ||

          boutique.proprietaire
            ?.toLowerCase()
            .includes(recherche)

          ||

          boutique.email
            ?.toLowerCase()
            .includes(recherche)

          ||

          boutique.ville
            ?.toLowerCase()
            .includes(recherche)

        );

    }


    // Filtre statut

    if (this.filtreStatut === 'approuve') {

      resultat =
        resultat.filter(
          boutique => boutique.apprové
        );

    }

    if (this.filtreStatut === 'attente') {

      resultat =
        resultat.filter(
          boutique => !boutique.apprové
        );

    }


    this.boutiquesFiltrees =
      resultat;

  }


  // =====================================================
  // VOIR LE DÉTAIL
  // =====================================================

  voirDetail(
    boutique: AdminBoutique
  ): void {

    this.router.navigate([
      '/admin/vendeurs',
      boutique.id
    ]);

  }


  // =====================================================
  // APPROUVER
  // =====================================================

  approuver(
    boutique: AdminBoutique
  ): void {

    this.adminService
      .validerBoutique(
        boutique.id,
        true
      )
      .subscribe({

        next: () => {

          boutique.apprové = true;

          this.filtrer();

        },

        error: (error) => {

          console.error(
            'Erreur approbation :',
            error
          );

          alert(
            error?.error?.detail ||
            'Impossible d’approuver cette boutique.'
          );

        }

      });

  }


  // =====================================================
  // REFUSER / DÉSACTIVER
  // =====================================================

  refuser(
    boutique: AdminBoutique
  ): void {

    if (!confirm(
      `Voulez-vous désactiver la boutique "${boutique.nom}" ?`
    )) {

      return;

    }

    this.adminService
      .validerBoutique(
        boutique.id,
        false
      )
      .subscribe({

        next: () => {

          boutique.apprové = false;

          this.filtrer();

        },

        error: (error) => {

          console.error(
            'Erreur désactivation :',
            error
          );

          alert(
            error?.error?.detail ||
            'Impossible de désactiver cette boutique.'
          );

        }

      });

  }

}