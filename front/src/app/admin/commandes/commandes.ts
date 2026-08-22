import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminCommandesService } from '../../core/services/admin-commande';
import { Commande } from '../../core/models/commande';
import { CommandePreview } from '../../vendeur/commandes/components/commande-preview/commande-preview';
import { CommandeStatus } from '../../vendeur/commandes/components/commande-status/commande-status';

@Component({
  selector: 'app-admin-commandes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CommandePreview,
    CommandeStatus
  ],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css'
})
export class AdminCommandes implements OnInit {

  commandes: Commande[] = [];

  commandesFiltrees: Commande[] = [];

  chargement = false;

  erreur = '';

  recherche = '';

  filtreStatut = 'tous';

  commandeSelectionnee: Commande | null = null;

  afficherStatut = false;

  constructor(
    private commandesService: AdminCommandesService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.chargerCommandes();

  }

  // ==========================================================
  // CHARGER LES COMMANDES
  // ==========================================================

  chargerCommandes(): void {

    this.chargement = true;

    this.erreur = '';

    this.commandesService
      .getCommandes()
      .subscribe({

        next: (commandes) => {

          this.commandes = commandes;

          this.recherche = '';
          this.filtreStatut = 'tous';
          this.filtrerCommandes();

          this.chargement = false;
          this.changeDetectorRef.detectChanges();

        },

        error: (error) => {

          console.error(
            'Erreur chargement commandes :',
            error
          );

          this.erreur = error.status === 401 || error.status === 403
            ? 'Session administrateur invalide ou expirée. Veuillez vous reconnecter.'
            : 'Impossible de charger les commandes.';

          this.chargement = false;
          this.changeDetectorRef.detectChanges();

        }

      });

  }

  // ==========================================================
  // RECHERCHE
  // ==========================================================

  filtrerCommandes(): void {

    const recherche =
      this.recherche
        .toLowerCase()
        .trim();

    this.commandesFiltrees =
      this.commandes.filter((commande) => {

        const correspondRecherche =
          !recherche ||
          commande.numero
            ?.toLowerCase()
            .includes(recherche) ||
          commande.client
            ?.toLowerCase()
            .includes(recherche) ||
          commande.email
            ?.toLowerCase()
            .includes(recherche);

        const correspondStatut =
          this.filtreStatut === 'tous' ||
          commande.statut === this.filtreStatut;

        return (
          correspondRecherche &&
          correspondStatut
        );

      });

  }

  // ==========================================================
  // FILTRE STATUT
  // ==========================================================

  changerStatutFiltre(): void {

    this.filtrerCommandes();

  }

  // ==========================================================
  // DETAIL
  // ==========================================================

  voirCommande(
    commande: Commande
  ): void {

    this.commandeSelectionnee =
      commande;

  }

  // ==========================================================
  // FERMER DETAIL
  // ==========================================================

  fermerDetail(): void {

    this.afficherStatut = false;
    this.commandeSelectionnee =
      null;

  }

  ouvrirStatut(commande: Commande): void {

    this.commandeSelectionnee = commande;
    this.afficherStatut = true;

  }

  fermerStatut(): void {

    this.afficherStatut = false;

  }

  supprimerCommande(commande: Commande): void {

    if (!confirm(`Supprimer définitivement la commande #${commande.numero} ?`)) {
      return;
    }

    this.commandesService
      .supprimerCommande(commande.id)
      .subscribe({

        next: () => {

          this.commandes = this.commandes.filter(
            (item) => item.id !== commande.id
          );
          this.filtrerCommandes();
          this.fermerDetail();

        },

        error: (error) => {

          console.error('Erreur suppression commande :', error);
          this.erreur = 'Impossible de supprimer la commande.';

        }

      });

  }

  enregistrerStatut(statut: string): void {

    if (this.commandeSelectionnee) {

      this.modifierStatut(
        this.commandeSelectionnee,
        statut
      );

    }

    this.afficherStatut = false;

  }

  // ==========================================================
  // MODIFIER LE STATUT
  // ==========================================================

  modifierStatut(
    commande: Commande,
    statut: string
  ): void {

    this.commandesService
      .modifierStatut(
        commande.id,
        statut
      )
      .subscribe({

        next: (commandeModifiee) => {

          const index =
            this.commandes.findIndex(
              c => c.id === commande.id
            );

          if (index !== -1) {

            this.commandes[index] =
              commandeModifiee;

          }

          this.filtrerCommandes();

          if (
            this.commandeSelectionnee &&
            this.commandeSelectionnee.id === commande.id
          ) {

            this.commandeSelectionnee =
              commandeModifiee;

          }

        },

        error: (error) => {

          console.error(
            'Erreur modification statut :',
            error
          );

        }

      });

  }

  // ==========================================================
  // LABEL STATUT
  // ==========================================================

  getStatutLabel(
    statut: string
  ): string {

    const labels: {
      [key: string]: string
    } = {

      en_attente: 'En attente',

      confirme: 'Confirmée',

      expedie: 'Expédiée',

      livre: 'Livrée',

      annule: 'Annulée'

    };

    return labels[statut] || statut;

  }

  // ==========================================================
  // CLASSE STATUT
  // ==========================================================

  getStatutClass(
    statut: string
  ): string {

    return `statut-${statut}`;

  }

  // ==========================================================
  // LABEL PAIEMENT
  // ==========================================================

  getPaiementLabel(
    methode: string | null
  ): string {

    if (methode === 'wave') {

      return 'Wave';

    }

    if (methode === 'orange_money') {

      return 'Orange Money';

    }

    return 'Non renseigné';

  }

  // ==========================================================
  // FORMAT MONTANT
  // ==========================================================

  formatMontant(
    montant: string | number
  ): string {

    return Number(montant)
      .toLocaleString('fr-FR') + ' FCFA';

  }

}