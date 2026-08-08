import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produit-tabs.html',
  styleUrl: './produit-tabs.css'
})
export class ProduitTabs {

  @Input()
  produit: any;

  onglet = 'description';

  ouvrir(nom: string): void {

    this.onglet = nom;

  }

}