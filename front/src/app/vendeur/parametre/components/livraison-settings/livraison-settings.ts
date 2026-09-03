import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ParametresBoutique } from '../../../../core/services/parametre-boutique';

@Component({
  selector: 'app-livraison-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './livraison-settings.html',
  styleUrl: './livraison-settings.css'
})
export class LivraisonSettings implements OnChanges {

  @Input() parametres: ParametresBoutique | null = null;

  @Input() enregistrement = false;

  @Output() modifier =
    new EventEmitter<Partial<ParametresBoutique>>();

  formulaire: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {

    this.formulaire = this.fb.group({

      zones_livraison: [
        ''
      ],

      delai_livraison: [
        '2-4 jours',
        [
          Validators.maxLength(100)
        ]
      ],

      frais_livraison: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ]

    });

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['parametres'] &&
      this.parametres
    ) {

      this.formulaire.patchValue({

        zones_livraison:
          this.parametres.zones_livraison || '',

        delai_livraison:
          this.parametres.delai_livraison || '2-4 jours',

        frais_livraison:
          this.parametres.frais_livraison ?? 0

      });

    }

  }

  enregistrer(): void {

    if (this.formulaire.invalid) {

      this.formulaire.markAllAsTouched();

      return;

    }

    this.modifier.emit(
      this.formulaire.value
    );

  }

  get delaiLivraison() {
    return this.formulaire.get('delai_livraison');
  }

  get fraisLivraison() {
    return this.formulaire.get('frais_livraison');
  }

}