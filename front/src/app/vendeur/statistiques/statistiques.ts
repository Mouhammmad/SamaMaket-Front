import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ StatistiquesCards } from './components/statistiques-cards/statistiques-cards';
import{ StatistiquesHeader } from './components/statistiques-header/statistiques-header';
import{ StatistiquesVentes } from './components/statistiques-ventes/statistiques-ventes';
import{ StatistiquesChart } from './components/statistiques-chart/statistiques-chart';
import { StatistiquesService } from '../../core/services/statistiques.service';


@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CommonModule, StatistiquesCards, StatistiquesHeader, StatistiquesVentes, StatistiquesChart],
  templateUrl: './statistiques.html',
  styleUrl: './statistiques.css'
})
export class Statistiques implements OnInit {

  statistiques: any = null;

  periode = 'mois';

  chargement = true;

  constructor(
    private statistiquesService: StatistiquesService
  ) {}

  ngOnInit(): void {

    this.charger();

  }

  charger(): void {

    this.statistiquesService

      .dashboard(this.periode)

      .subscribe({

        next: (data: any) => {

          this.statistiques = data;

          this.chargement = false;

        }

      });

  }

  changerPeriode(periode: string): void {

    this.periode = periode;

    this.charger();

  }

}