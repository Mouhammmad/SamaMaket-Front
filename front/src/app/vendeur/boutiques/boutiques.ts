import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { BoutiqueService } from '../../core/services/boutique';

import { BoutiqueHeader } from './components/boutique-header/boutique-header';
import { BoutiqueNavigation } from './components/boutique-navigation/boutique-navigation';
import { BoutiqueInfos } from './components/boutique-infos/boutique-infos';
import { BoutiqueNote } from './components/boutique-note/boutique-note';
import { BoutiqueCategories } from './components/boutique-categories/boutique-categories';
import { BoutiqueProduits } from './components/boutique-produits/boutique-produits';
import { BoutiqueApropos } from './components/boutique-apropos/boutique-apropos';
import { BoutiqueAvis } from './components/boutique-avis/boutique-avis';
import { BoutiquePromotions } from './components/boutique-promotions/boutique-promotions';
@Component({
  selector: 'app-boutiques',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,

    BoutiqueHeader,
    BoutiqueNavigation,
    BoutiqueInfos,
    BoutiqueNote,
    BoutiqueCategories,
    BoutiqueProduits,
    BoutiqueApropos,
    BoutiqueAvis,
    BoutiquePromotions
  ],

  templateUrl: './boutiques.html',

  styleUrl: './boutiques.css'
})
export class Boutiques implements OnInit {

  // ==========================================
  // FORMULAIRE
  // ==========================================

  boutiqueForm: FormGroup;


  // ==========================================
  // DONNÉES BOUTIQUE
  // ==========================================

  boutique: any = null;

  onglet = 'produits';
  // ==========================================
// SUIVI DE LA BOUTIQUE
// ==========================================

estSuivi = false;

chargementSuivi = false;


  // ==========================================
  // PRODUITS
  // ==========================================

  produits: any[] = [];

  chargementProduits = true;


  // ==========================================
  // AVIS
  // ==========================================

  avis: any[] = [];


  // ==========================================
  // PROMOTIONS
  // ==========================================

  promotions: any[] = [];

  chargementPromotions = true;


  // ==========================================
  // IMAGES
  // ==========================================

  selectedBanniere?: File;

  selectedLogo?: File;


  // ==========================================
  // CONSTRUCTEUR
  // ==========================================

  constructor(

    private fb: FormBuilder,

    private http: HttpClient,

    private boutiqueService: BoutiqueService,
  ) {

    this.boutiqueForm = this.fb.group({

      nom: [
        '',
        Validators.required
      ],

      description: [
        ''
      ],

      ville: [
        ''
      ],

      telephone: [
        ''
      ],

      email: [
        '',
        Validators.email
      ]

    });

  }


  // ==========================================
  // INITIALISATION
  // ==========================================

  ngOnInit(): void {

    this.chargerBoutique();

  }


  // ==========================================
  // CHANGER D'ONGLET
  // ==========================================

  changerOnglet(tab: string): void {

    this.onglet = tab;

  }


  // ==========================================
  // SÉLECTION BANNIÈRE
  // ==========================================

  onBanniereSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (input.files?.length) {

      this.selectedBanniere =
        input.files[0];

    }

  }


  // ==========================================
  // SÉLECTION LOGO
  // ==========================================

  onLogoSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (input.files?.length) {

      this.selectedLogo =
        input.files[0];

    }

  }


  // ==========================================
  // CHARGER MA BOUTIQUE
  // ==========================================

  chargerBoutique(): void {

    this.boutiqueService
      .getMaBoutique()
      .subscribe({

        next: (response) => {

          console.log(
            'Boutique :',
            response
          );

          this.boutique =
            response;


          // Remplir le formulaire
          this.boutiqueForm.patchValue({

            nom:
              response.nom || '',

            description:
              response.description || '',

            ville:
              response.ville || '',

            telephone:
              response.telephone || '',

            email:
              response.email || ''

          });


          // Maintenant que nous avons
          // l'identifiant de la boutique
          this.chargerProduits();

          this.chargerAvis();

          this.chargerPromotions();
          this.chargerStatutSuivi();

        },


        error: (error) => {

          console.error(
            'Erreur boutique API :',
            error
          );

          this.boutique = null;

          this.produits = [];

          this.avis = [];

          this.promotions = [];

          this.chargementProduits = false;

          this.chargementPromotions = false;

        }

      });

  }


  // ==========================================
  // ENREGISTRER LA BOUTIQUE
  // ==========================================

  enregistrer(): void {

    if (
      this.boutiqueForm.invalid
    ) {

      this.boutiqueForm
        .markAllAsTouched();

      return;

    }


    const data =
      new FormData();


    const values =
      this.boutiqueForm.value;


    Object.entries(values)
      .forEach(
        ([key, value]) => {

          if (
            value !== null &&
            value !== undefined
          ) {

            data.append(
              key,
              String(value)
            );

          }

        }
      );


    // Logo
    if (this.selectedLogo) {

      data.append(
        'logo',
        this.selectedLogo
      );

    }


    // Bannière
    if (this.selectedBanniere) {

      data.append(
        'banniere',
        this.selectedBanniere
      );

    }


    // Création ou modification
    const request =
      this.boutique

        ? this.boutiqueService
          .modifierBoutique(this.boutique.id, data)

        : this.boutiqueService
            .creerBoutique(data);


    request.subscribe({

      next: () => {

        this.chargerBoutique();

        alert(
          'Boutique enregistrée avec succès.'
        );

      },

      error: (error) => {

        console.error(
          'Erreur enregistrement boutique :',
          error
        );

        alert(
          'Impossible d’enregistrer la boutique pour le moment.'
        );

      }

    });

  }

  enregistrerImages(): void {

    if (!this.boutique?.id) {
      alert('La boutique doit être chargée avant de modifier ses images.');
      return;
    }

    if (!this.selectedLogo && !this.selectedBanniere) {
      alert('Sélectionnez au moins une image.');
      return;
    }

    const data = new FormData();

    if (this.selectedLogo) {
      data.append('logo', this.selectedLogo);
    }

    if (this.selectedBanniere) {
      data.append('banniere', this.selectedBanniere);
    }

    this.boutiqueService.modifierBoutique(this.boutique.id, data).subscribe({
      next: (response) => {
        this.boutique = response;
        this.selectedLogo = undefined;
        this.selectedBanniere = undefined;
        alert('Images de la boutique enregistrées avec succès.');
      },
      error: (error) => {
        console.error('Erreur modification images boutique :', error);
        alert(error.error?.detail || 'Impossible d’enregistrer les images.');
      }
    });

  }

  contacter(): void {

  if (!this.boutique?.id) {
    return;
  }

  this.boutiqueService
    .contacterBoutique(this.boutique.id)
    .subscribe({

      next: (response) => {

        console.log(
          'Conversation :',
          response
        );

        const conversationId =
          response.conversation.id;

        console.log(
          'Conversation ID :',
          conversationId
        );

        // Pour le moment :
        // on affiche simplement l'identifiant
        // avant de créer l'interface de messagerie.

        alert(
          `Conversation ouverte avec ${this.boutique.nom}`
        );

      },

      error: (error) => {

        console.error(
          'Erreur contact boutique :',
          error
        );

        if (error.status === 401) {

          alert(
            'Vous devez être connecté pour contacter cette boutique.'
          );

          return;
        }

        if (error.status === 400) {

          alert(
            error.error?.detail ||
            'Impossible de contacter cette boutique.'
          );

          return;
        }

        alert(
          'Une erreur est survenue lors de l’ouverture de la conversation.'
        );

      }

    });

}


  // ==========================================
  // CHARGER LES PRODUITS
  // ==========================================

  chargerProduits(): void {

    if (!this.boutique?.id) {

      this.produits = [];

      this.chargementProduits =
        false;

      return;

    }


    this.chargementProduits =
      true;


    this.boutiqueService

      .getProduitsBoutique(
        this.boutique.id
      )

      .subscribe({

        next: (response: any) => {

          const payload =
            Array.isArray(response)

              ? response

              : response?.results
                || response?.data
                || [];


          this.produits =
            Array.isArray(payload)

              ? payload

              : [];


          this.chargementProduits =
            false;

        },


        error: (error) => {

          console.error(
            'Produits boutique API error :',
            error
          );

          this.produits = [];

          this.chargementProduits =
            false;

        }

      });

  }


  // ==========================================
  // CHARGER LES AVIS
  // ==========================================

  chargerAvis(): void {

    if (!this.boutique?.id) {

      this.avis = [];

      return;

    }


    this.boutiqueService

      .getAvisBoutique(
        this.boutique.id
      )

      .subscribe({

        next: (response: any) => {

          const payload =
            Array.isArray(response)

              ? response

              : response?.results
                || response?.data
                || [];


          this.avis =
            Array.isArray(payload)

              ? payload

              : [];

        },


        error: (error) => {

          console.error(
            'Avis boutique API error :',
            error
          );

          this.avis = [];

        }

      });

  }


  // ==========================================
  // CHARGER LES PROMOTIONS
  // ==========================================

  chargerPromotions(): void {

    if (!this.boutique?.id) {

      this.promotions = [];

      this.chargementPromotions =
        false;

      return;

    }


    this.chargementPromotions =
      true;


    this.boutiqueService

      .getPromotionsBoutique(
        this.boutique.id
      )

      .subscribe({

        next: (response: any) => {

          const payload =
            Array.isArray(response)

              ? response

              : response?.results
                || response?.data
                || [];


          this.promotions =
            Array.isArray(payload)

              ? payload

              : [];


          this.chargementPromotions =
            false;

        },


        error: (error) => {

          console.error(
            'Promotions boutique API error :',
            error
          );

          this.promotions = [];

          this.chargementPromotions =
            false;

        }

      });

  }
  // ==========================================
// CHARGER LE STATUT DE SUIVI
// ==========================================

chargerStatutSuivi(): void {

  if (!this.boutique?.id) {
    this.estSuivi = false;
    return;
  }

  this.boutiqueService
    .getStatutSuivi(this.boutique.id)
    .subscribe({

      next: (response) => {

        this.estSuivi = response.suivi;

        // Synchroniser le nombre d'abonnés
        if (this.boutique) {
          this.boutique.followers = response.followers;
          this.boutique.abonnes = response.followers;
        }

      },

      error: (error) => {

        console.error(
          'Erreur statut suivi :',
          error
        );

        this.estSuivi = false;

      }

    });

}


// ==========================================
// SUIVRE / NE PLUS SUIVRE
// ==========================================

toggleSuivi(): void {

  if (!this.boutique?.id || this.chargementSuivi) {
    return;
  }

  this.chargementSuivi = true;

  const requete = this.estSuivi

    ? this.boutiqueService
        .nePlusSuivreBoutique(this.boutique.id)

    : this.boutiqueService
        .suivreBoutique(this.boutique.id);


  requete.subscribe({

    next: (response) => {

      this.estSuivi = response.suivi;

      if (this.boutique) {

        this.boutique.followers =
          response.followers;

        this.boutique.abonnes =
          response.followers;

      }

      this.chargementSuivi = false;

    },

    error: (error) => {

      console.error(
        'Erreur suivi boutique :',
        error
      );

      this.chargementSuivi = false;

      alert(
        'Impossible de modifier le suivi de cette boutique.'
      );

    }

  });

}

}