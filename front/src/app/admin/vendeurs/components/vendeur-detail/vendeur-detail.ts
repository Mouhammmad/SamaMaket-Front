import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, timeout } from 'rxjs';

import {
  AdminService,
  AdminBoutique
} from '../../../../core/services/admin.service';

@Component({
  selector: 'app-vendeur-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendeur-detail.html',
  styleUrl: './vendeur-detail.css'
})
export class VendeurDetail implements OnInit {

  private adminService = inject(AdminService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  boutique: AdminBoutique | null = null;

  chargement = true;
  erreur = '';
  confirmationAction: 'approuver' | 'desactiver' | null = null;
  traitement = false;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {

      this.erreur = 'Boutique introuvable.';
      this.chargement = false;

      return;
    }

    this.chargerBoutique(id);
  }


  // =====================================================
  // CHARGER LA BOUTIQUE
  // =====================================================

  chargerBoutique(id: number): void {

    this.chargement = true;
    this.erreur = '';

    this.adminService
      .getBoutique(id)
      .pipe(
        timeout(10000),
        finalize(() => {
          this.chargement = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({

        next: (boutique) => {

          console.log(
            'Boutique chargée :',
            boutique
          );

          this.boutique = boutique;
          this.changeDetector.markForCheck();

        },

        error: (error) => {

          console.error(
            'Erreur chargement boutique :',
            error
          );

          this.erreur =
            error?.error?.detail ||
            'Impossible de charger cette boutique.';
          this.changeDetector.markForCheck();

        }

      });

  }


  // =====================================================
  // RETOUR
  // =====================================================

  retour(): void {

    this.router.navigate([
      '/admin/vendeurs'
    ]);

  }


  // =====================================================
  // APPROUVER
  // =====================================================

  approuver(): void {

    if (!this.boutique) {
      return;
    }

    this.confirmationAction = 'approuver';
  }

  desactiver(): void {

    if (!this.boutique) {
      return;
    }

    this.confirmationAction = 'desactiver';
  }

  annulerConfirmation(): void {
    if (!this.traitement) {
      this.confirmationAction = null;
    }
  }

  confirmerAction(): void {

    if (!this.boutique || !this.confirmationAction) {
      return;
    }

    const approuver = this.confirmationAction === 'approuver';
    this.traitement = true;

    this.adminService
      .validerBoutique(
        this.boutique.id,
        approuver
      )
      .subscribe({

        next: () => {

          if (this.boutique) {

            this.boutique.apprové = approuver;

          }

          this.confirmationAction = null;
          this.traitement = false;
          this.changeDetector.markForCheck();

        },

        error: (error) => {

          console.error(
            'Erreur approbation boutique :',
            error
          );

          this.erreur = error?.error?.detail ||
            `Impossible de ${approuver ? 'approuver' : 'désactiver'} cette boutique.`;
          this.confirmationAction = null;
          this.traitement = false;
          this.changeDetector.markForCheck();

        }

      });

  }


  // =====================================================
  // =====================================================
  // LIBELLÉ DU STATUT
  // =====================================================

  getStatutLabel(): string {

    if (!this.boutique) {
      return '';
    }

    return this.boutique.apprové
      ? 'Approuvé'
      : 'En attente';

  }

}