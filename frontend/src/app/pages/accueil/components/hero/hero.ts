import { Component } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    Header,
    FormsModule
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

  recherche = '';

  constructor(private router: Router) {}

  rechercher() {

    if (this.recherche.trim()) {

      this.router.navigate(['/produits'], {
        queryParams: {
          search: this.recherche
        }
      });

    } else {

      this.router.navigate(['/produits']);

    }

  }

}