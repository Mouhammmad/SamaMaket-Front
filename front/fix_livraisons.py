from pathlib import Path

path = Path('src/app/vendeur/livraisons/livraisons.ts')
content = '''import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivraisonHeader } from './components/livraison-header/livraison-header';
import { LivraisonFilter } from './components/livraison-filter/livraison-filter';
import { LivraisonList } from './components/livraison-list/livraison-list';
import { LivraisonDetails } from './components/livraison-details/livraison-details';
import { LivraisonStatus } from './components/livraison-status/livraison-status';
import { LivraisonEmpty } from './components/livraison-empty/livraison-empty';

import { LivraisonService } from '../../core/services/livraison.service';

@Component({
  selector: 'app-livraison',
  standalone: true,
  imports: [
    CommonModule,
    LivraisonHeader,
    LivraisonFilter,
    LivraisonList,
    LivraisonDetails,
    LivraisonStatus,
    LivraisonEmpty
  ],
  templateUrl: './livraisons.html',
  styleUrl: './livraisons.css'
})
export class Livraisons implements OnInit {

  livraisons: any[] = [];

  livraisonSelectionnee: any = null;

  chargement = true;

  constructor(
    private livraisonService: LivraisonService
  ) {}

  ngOnInit(): void {
    this.chargerLivraisons();
  }

  chargerLivraisons(): void {
    this.livraisonService.getLivraisons().subscribe({
      next: (data: any) => {
        this.livraisons = data.results || data;
        this.chargement = false;
      }
    });
  }

  selectionner(livraison: any): void {
    this.livraisonSelectionnee = livraison;
  }

  modifierLivraison(data: any): void {
    this.livraisonService.modifierLivraison(data.id, data).subscribe({
      next: () => {
        this.chargerLivraisons();
      }
    });
  }

  rechercher(texte: string): void {
    this.livraisonService.rechercherLivraisons(texte).subscribe({
      next: (data: any) => {
        this.livraisons = data.results || data;
      }
    });
  }

  filtrer(statut: string): void {
    this.livraisonService.filtrerParStatut(statut).subscribe({
      next: (data: any) => {
        this.livraisons = data.results || data;
      }
    });
  }
}
'''
path.write_text(content, encoding='utf-8')
print('rewritten')
