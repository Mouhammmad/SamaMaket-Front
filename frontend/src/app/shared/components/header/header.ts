import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

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