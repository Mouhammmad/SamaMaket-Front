import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './paiement.html',
  styleUrl: './paiement.css'
})
export class Paiement {

  methode = 'wave';

  numero = '';

  constructor(private router: Router){}

  payer(): void {

    this.router.navigate(['/confirmation']);

}

}