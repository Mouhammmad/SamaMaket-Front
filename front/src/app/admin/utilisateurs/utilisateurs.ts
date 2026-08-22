import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, timeout } from 'rxjs';

import {
  AdminService,
  AdminUtilisateur
} from '../../core/services/admin.service';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.css'
})
export class Utilisateurs implements OnInit {

  utilisateurs: AdminUtilisateur[] = [];

  recherche = '';

  chargement = true;

  erreur = '';

  total = 0;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.chargerUtilisateurs();

  }


  // =====================================================
  // CHARGER LES UTILISATEURS
  // =====================================================

  chargerUtilisateurs(): void {

    this.chargement = true;

    this.erreur = '';

    this.adminService
      .getUtilisateurs(this.recherche)
      .pipe(
        timeout(10000),
        finalize(() => {
          this.chargement = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({

        next: (response) => {

          this.utilisateurs = Array.isArray(response)
            ? response
            : response?.results || [];

          this.total = Array.isArray(response)
            ? response.length
            : response?.count || this.utilisateurs.length;
          this.changeDetector.markForCheck();

        },

        error: (error) => {

          console.error(
            'Erreur chargement utilisateurs :',
            error
          );

          this.erreur = error?.status === 401
            ? 'Votre session a expiré. Veuillez vous reconnecter.'
            : error?.status === 403
              ? 'Accès administrateur refusé.'
              : 'Impossible de charger les utilisateurs.';
              this.changeDetector.markForCheck();

        }

      });

  }


  // =====================================================
  // RECHERCHE
  // =====================================================

  rechercher(): void {

    this.chargerUtilisateurs();

  }


  // =====================================================
  // VOIR LE DETAIL
  // =====================================================

  voirDetail(utilisateur: AdminUtilisateur): void {

    if (!utilisateur?.id) {
      this.erreur = 'Utilisateur introuvable.';
      return;
    }

    this.router.navigate([
      '/admin/utilisateurs',
      utilisateur.id
    ]);

  }


  // =====================================================
  // SUSPENDRE
  // =====================================================

  suspendre(
    utilisateur: AdminUtilisateur
  ): void {

    if (!confirm(
      `Voulez-vous suspendre le compte de ${utilisateur.nom} ?`
    )) {

      return;

    }

    this.adminService
      .suspendreUtilisateur(utilisateur.id)
      .subscribe({

        next: () => {

          utilisateur.is_active = false;

          utilisateur.statut = 'Suspendu';

        },

        error: (error) => {

          console.error(
            'Erreur suspension :',
            error
          );

        }

      });

  }


  // =====================================================
  // REACTIVER
  // =====================================================

  reactiver(
    utilisateur: AdminUtilisateur
  ): void {

    this.adminService
      .reactiverUtilisateur(utilisateur.id)
      .subscribe({

        next: () => {

          utilisateur.is_active = true;

          utilisateur.statut = 'Actif';

        },

        error: (error) => {

          console.error(
            'Erreur réactivation :',
            error
          );

        }

      });

  }


  // =====================================================
  // SUPPRIMER
  // =====================================================

  supprimer(
    utilisateur: AdminUtilisateur
  ): void {

    if (!confirm(
      `Voulez-vous vraiment supprimer ${utilisateur.nom} ?`
    )) {

      return;

    }

    this.adminService
      .supprimerUtilisateur(utilisateur.id)
      .subscribe({

        next: () => {

          this.utilisateurs =
            this.utilisateurs.filter(
              user => user.id !== utilisateur.id
            );

          this.total--;

        },

        error: (error) => {

          console.error(
            'Erreur suppression :',
            error
          );

        }

      });

  }

}