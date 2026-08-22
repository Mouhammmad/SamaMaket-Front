import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AdminStatistiquesService,
  StatistiquesAdmin
} from '../../core/services/admin-statistiques';

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './statistiques.html',
  styleUrl: './statistiques.css'
})
export class Statistiques implements OnInit {

  statistiques: StatistiquesAdmin | null = null;

  chargement = true;

  erreur = '';

  constructor(
    private statistiquesService: AdminStatistiquesService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.chargerStatistiques();

  }

  chargerStatistiques(): void {

    this.chargement = true;

    this.erreur = '';

    this.statistiquesService
      .getStatistiques()
      .subscribe({

        next: (data) => {

          this.statistiques = data;

          this.chargement = false;
          this.changeDetectorRef.detectChanges();

        },

        error: (error) => {

          console.error(
            'Erreur statistiques admin :',
            error
          );

          this.erreur =
            'Impossible de charger les statistiques.';

          this.chargement = false;
          this.changeDetectorRef.detectChanges();

        }

      });

  }

  get evolutionPositive(): boolean {

    return (
      (this.statistiques?.commandes_change_pct ?? 0) >= 0
    );

  }

}