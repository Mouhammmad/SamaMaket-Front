import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize, timeout } from 'rxjs';

import {
  ParametreBoutiqueService,
  ParametresBoutique
} from '../../core/services/parametre-boutique';

import { ParametreHeader } from './components/parametre-header/parametre-header';
import { BoutiqueSettings } from './components/boutique-settings/boutique-settings';
import { ContactSettings } from './components/contact-settings/contact-settings';
import { LivraisonSettings } from './components/livraison-settings/livraison-settings';
import { RetourSettings } from './components/retour-settings/retour-settings';
import { PaiementSettings } from './components/paiement-settings/paiement-settings';
import { NotificationSettings } from './components/notification-settings/notification-settings';

@Component({
  selector: 'app-parametre',
  standalone: true,

  imports: [
    CommonModule,

    ParametreHeader,
    BoutiqueSettings,
    ContactSettings,
    LivraisonSettings,
    RetourSettings,
    PaiementSettings,
    NotificationSettings
  ],

  templateUrl: './parametre.html',
  styleUrl: './parametre.css'
})
export class Parametre implements OnInit {

  parametres: ParametresBoutique | null = null;
  chargement = true;
  sectionEnregistrement: string | null = null;
  messageSucces = '';
  messageErreur = '';

  constructor(
    private parametreService: ParametreBoutiqueService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerParametres();
  }

  chargerParametres(): void {
    this.chargement = true;
    this.messageErreur = '';

    this.parametreService
      .getParametres()
      .subscribe({
        next: (response) => {
          console.log('Parametres recus:', response);
          this.parametres = response;
          this.chargement = false;
          this.changeDetector.markForCheck();
        },
        error: (error) => {
          console.error('Erreur chargement parametres boutique:', error);
          this.parametres = null;
          this.chargement = false;

          if (error.status === 401) {
            this.messageErreur = 'Non autorise. Veuillez vous reconnecter.';
          } else if (error.status === 404) {
            this.messageErreur = 'Boutique non trouvee. Erreur: ' + (error.error?.detail || 'inconnue');
          } else if (error.status === 403) {
            this.messageErreur = 'Acces refuse pour cette action.';
          } else {
            this.messageErreur = 'Erreur statut ' + (error.status || 'reseau') + ': ' + (error.error?.detail || error.message || 'inconnue');
          }

          this.changeDetector.markForCheck();
        }
      });
  }

  enregistrer(
    modifications: Partial<ParametresBoutique>,
    section: string
  ): void {
    this.sectionEnregistrement = section;
    this.messageSucces = '';
    this.messageErreur = '';

    this.parametreService
      .modifierParametres(modifications)
      .pipe(
        timeout(10000),
        finalize(() => {
          this.sectionEnregistrement = null;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({
        next: (response) => {
          this.parametres = response;
          this.messageSucces = 'Parametres enregistres avec succes.';

          window.setTimeout(() => {
            this.messageSucces = '';
          }, 3500);
        },
        error: (error) => {
          console.error('Erreur sauvegarde parametres:', error);
          this.messageErreur = 'Erreur lors de l\'enregistrement.';

          window.setTimeout(() => {
            this.messageErreur = '';
          }, 4000);
        }
      });
  }

  actualiser(): void {
    this.chargerParametres();
  }
}
