import { Component } from '@angular/core';

import { Hero } from './components/hero/hero';
import { Categories } from './components/categories/categories';
import { NouveauProduits } from './components/nouveau-produits/nouveau-produits';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    Hero,
    Categories,
    NouveauProduits
  ],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {}