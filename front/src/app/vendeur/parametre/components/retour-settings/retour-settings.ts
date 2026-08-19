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
  selector: 'app-retour-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './retour-settings.html',
  styleUrl: './retour-settings.css'
})
export class RetourSettings implements OnChanges {

  @Input() parametres: ParametresBoutique | null = null;

  @Input() enregistrement = false;

  @Output() modifier =
    new EventEmitter<Partial<ParametresBoutique>>();

  formulaire: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.formulaire = this.fb.group({
      retours_acceptes: [true],
      delai_retour: [
        7,
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
        retours_acceptes:
          this.parametres.retours_acceptes ?? true,

        delai_retour:
          this.parametres.delai_retour ?? 7
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

  get delaiRetour() {
    return this.formulaire.get('delai_retour');
  }
}