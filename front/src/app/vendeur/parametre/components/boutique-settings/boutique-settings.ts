import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ParametresBoutique } from '../../../../core/services/parametre-boutique';

@Component({
  selector: 'app-boutique-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './boutique-settings.html',
  styleUrl: './boutique-settings.css'
})
export class BoutiqueSettings implements OnChanges {

  @Input() parametres: ParametresBoutique | null = null;

  @Input() enregistrement = false;

  @Output() modifier =
    new EventEmitter<Partial<ParametresBoutique>>();

  formulaire: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {

    this.formulaire = this.fb.group({

      nom: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      description: [
        ''
      ],

      ville: [
        ''
      ]

    });

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['parametres'] &&
      this.parametres
    ) {

      this.formulaire.patchValue({

        nom: this.parametres.nom || '',

        description:
          this.parametres.description || '',

        ville:
          this.parametres.ville || ''

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

  get nom() {
    return this.formulaire.get('nom');
  }

}