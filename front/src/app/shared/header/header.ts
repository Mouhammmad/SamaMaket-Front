import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanierService } from '../../core/services/panier';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  nombreArticles = 0;

  constructor(private panierService: PanierService) {
    this.panierService.nombreArticles$.subscribe((nombre: number) => {
      this.nombreArticles = nombre;
    });
  }

}