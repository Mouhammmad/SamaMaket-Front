import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-adresse-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './adresse-form.html',
  styleUrl: './adresse-form.css'
})
export class AdresseForm implements OnInit {

  @Output()
  enregistrer = new EventEmitter<any>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      prenom: ['', Validators.required],

      nom: ['', Validators.required],

      telephone: ['', Validators.required],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      pays: ['Sénégal', Validators.required],

      ville: ['', Validators.required],

      quartier: ['', Validators.required],

      adresse: ['', Validators.required],

      instructions: ['']

    });

  }

  continuer() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.enregistrer.emit(
      this.form.value
    );

  }

}