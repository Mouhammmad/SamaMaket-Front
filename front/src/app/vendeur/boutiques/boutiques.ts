import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-boutiques',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './boutiques.html',
  styleUrl: './boutiques.css'
})
export class Boutiques {

  boutiqueForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.boutiqueForm = this.fb.group({

      nom: ['', Validators.required],

      description: [''],

      ville: ['', Validators.required],

      telephone: [''],

      email: [''],

      logo: [null],

      banniere: [null]

    });

  }

  enregistrer() {

    console.log(this.boutiqueForm.value);

  }

}