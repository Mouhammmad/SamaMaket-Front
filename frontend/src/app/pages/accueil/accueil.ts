import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Categories } from './components/categories/categories';
import { FuturProduits } from './components/futur-produits/futur-produits';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    Hero,
    Categories,
    FuturProduits
  ],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {}