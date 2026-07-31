import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProduitPreview } from './vendeur/produits/components/produit-preview/produit-preview';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProduitPreview],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}