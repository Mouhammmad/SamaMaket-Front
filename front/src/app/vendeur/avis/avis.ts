import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisService } from '../../core/services/avis.service';

import { AvisHeader } from './components/avis-header/avis-header';
import { AvisFilter } from './components/avis-filter/avis-filter';
import { AvisList } from './components/avis-list/avis-list';
import { AvisDetails } from './components/avis-details/avis-details';
import { AvisStats } from './components/avis-stats/avis-stats';
import { AvisEmpty } from './components/avis-empty/avis-empty';

@Component({
  selector: 'app-avis',
  standalone: true,
  imports: [
    CommonModule,
    AvisHeader,
    AvisFilter,
    AvisList,
    AvisDetails,
    AvisStats,
    AvisEmpty
  ],
  templateUrl: './avis.html',
  styleUrl: './avis.css'
})
export class Avis implements OnInit {

  avis: any[] = [];

  avisSelectionne: any = null;

  chargement = true;

  constructor(
    private avisService: AvisService
  ) {}

  ngOnInit(): void {

    this.chargerAvis();

  }

  chargerAvis(): void {

    this.avisService
      .getAvisVendeur()
      .subscribe({

        next: (data: any) => {

          this.avis = data.results || data;

          this.chargement = false;

        }

      });

  }

  selectionnerAvis(avis: any): void {

    this.avisSelectionne = avis;

  }
rechercher(texte: string): void {

  this.avisService.rechercherAvis(texte)

    .subscribe({

      next: (data: any) => {

        this.avis = data.results || data;

      }

    });

}

filtrerParNote(note: string): void {

  this.avisService.filtrerParNote(note)

    .subscribe({

      next: (data: any) => {

        this.avis = data.results || data;

      }

    });

}
}