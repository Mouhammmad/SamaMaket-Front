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
  selector: 'app-contact-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact-settings.html',
  styleUrl: './contact-settings.css'
})
export class ContactSettings implements OnChanges {

  @Input() parametres: ParametresBoutique | null = null;

  @Input() enregistrement = false;

  @Output() modifier =
    new EventEmitter<Partial<ParametresBoutique>>();

  formulaire: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {

    this.formulaire = this.fb.group({

      telephone: [
        '',
        [
          Validators.maxLength(30)
        ]
      ],

      email: [
        '',
        [
          Validators.email
        ]
      ],

      whatsapp: [
        '',
        [
          Validators.maxLength(30)
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

        telephone:
          this.parametres.telephone || '',

        email:
          this.parametres.email || '',

        whatsapp:
          this.parametres.whatsapp || ''

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

  get telephone() {
    return this.formulaire.get('telephone');
  }

  get email() {
    return this.formulaire.get('email');
  }

  get whatsapp() {
    return this.formulaire.get('whatsapp');
  }

}