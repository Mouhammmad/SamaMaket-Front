import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, timeout } from 'rxjs';

import { AdminService } from '../../core/services/admin.service';

interface Utilisateur {
  id: number;
  username: string;
  nom: string;
  email: string;
  role: string;
  phone: string | null;
  date_joined: string;
  is_active: boolean;
  statut: string;
}

@Component({
  selector: 'app-utilisateur-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utilisateur-detail.html',
  styleUrl: './utilisateur-detail.css'
})
export class UtilisateurDetail implements OnInit {

  private adminService = inject(AdminService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  utilisateur: Utilisateur | null = null;

  chargement = true;
  erreur = '';


  // =====================================================
  // INITIALISATION
  // =====================================================

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (!id) {
        this.erreur = 'Utilisateur introuvable.';
        this.chargement = false;
        return;
      }

      this.chargerUtilisateur(id);
    });
  }


  // =====================================================
  // CHARGER L'UTILISATEUR
  // =====================================================

  chargerUtilisateur(id: number): void {

    this.chargement = true;
    this.erreur = '';

    this.adminService
      .getUtilisateur(id)
      .pipe(
        timeout(10000),
        finalize(() => {
          this.chargement = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({

        next: (utilisateur) => {

          console.log(
            'Utilisateur chargé :',
            utilisateur
          );

          this.utilisateur = utilisateur;
          this.changeDetector.markForCheck();
        },

        error: (error) => {

          console.error(
            'Erreur chargement utilisateur :',
            error
          );

          this.erreur = error?.status === 401
            ? 'Votre session a expiré. Veuillez vous reconnecter.'
            : error?.status === 403
              ? 'Accès administrateur refusé.'
              : error?.error?.detail ||
                'Impossible de charger cet utilisateur.';
                  this.changeDetector.markForCheck();
        }

      });
  }


  // =====================================================
  // RETOUR À LA LISTE
  // =====================================================

  retour(): void {

    this.router.navigate([
      '/admin/utilisateurs'
    ]);

  }


  // =====================================================
  // LABEL DU RÔLE
  // =====================================================

  getRoleLabel(role: string): string {

    switch (role) {

      case 'ADMIN':
        return 'Administrateur';

      case 'VENDOR':
        return 'Vendeur';

      case 'CUSTOMER':
        return 'Client';

      default:
        return role;

    }

  }


  // =====================================================
  // INITIALES DE L'UTILISATEUR
  // =====================================================

  getInitiales(): string {

    if (!this.utilisateur) {
      return '?';
    }

    const nom =
      this.utilisateur.nom?.trim();

    // Si aucun nom n'est disponible
    if (!nom) {

      return this.utilisateur.username
        ?.charAt(0)
        .toUpperCase() || '?';

    }

    const morceaux =
      nom.split(/\s+/);

    // Exemple : Adramane Koulibaly
    // => AK
    if (morceaux.length >= 2) {

      return (
        morceaux[0].charAt(0) +
        morceaux[1].charAt(0)
      ).toUpperCase();

    }

    // Exemple : Admin
    // => A
    return nom
      .charAt(0)
      .toUpperCase();

  }


  // =====================================================
  // SUSPENDRE
  // =====================================================

  suspendre(): void {

    if (!this.utilisateur) {
      return;
    }

    const confirmation = confirm(
      `Voulez-vous suspendre ${this.utilisateur.nom} ?`
    );

    if (!confirmation) {
      return;
    }

    this.adminService
      .suspendreUtilisateur(
        this.utilisateur.id
      )
      .subscribe({

        next: () => {

          if (!this.utilisateur) {
            return;
          }

          this.utilisateur.is_active = false;
          this.utilisateur.statut = 'Suspendu';

          alert(
            'Utilisateur suspendu avec succès.'
          );

        },

        error: (error) => {

          console.error(
            'Erreur suspension :',
            error
          );

          alert(
            error?.error?.detail ||
            'Impossible de suspendre cet utilisateur.'
          );

        }

      });

  }


  // =====================================================
  // RÉACTIVER
  // =====================================================

  reactiver(): void {

    if (!this.utilisateur) {
      return;
    }

    this.adminService
      .reactiverUtilisateur(
        this.utilisateur.id
      )
      .subscribe({

        next: () => {

          if (!this.utilisateur) {
            return;
          }

          this.utilisateur.is_active = true;
          this.utilisateur.statut = 'Actif';

          alert(
            'Utilisateur réactivé avec succès.'
          );

        },

        error: (error) => {

          console.error(
            'Erreur réactivation :',
            error
          );

          alert(
            error?.error?.detail ||
            'Impossible de réactiver cet utilisateur.'
          );

        }

      });

  }


  // =====================================================
  // SUPPRIMER
  // =====================================================

  supprimer(): void {

    if (!this.utilisateur) {
      return;
    }

    const confirmation = confirm(
      `Voulez-vous vraiment supprimer ${this.utilisateur.nom} ?\n\nCette action est irréversible.`
    );

    if (!confirmation) {
      return;
    }

    this.adminService
      .supprimerUtilisateur(
        this.utilisateur.id
      )
      .subscribe({

        next: () => {

          alert(
            'Utilisateur supprimé avec succès.'
          );

          this.retour();

        },

        error: (error) => {

          console.error(
            'Erreur suppression :',
            error
          );

          alert(
            error?.error?.detail ||
            'Impossible de supprimer cet utilisateur.'
          );

        }

      });

  }

}