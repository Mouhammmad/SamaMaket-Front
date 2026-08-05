import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistiques-chart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './statistiques-chart.html',
  styleUrl: './statistiques-chart.css'
})
export class StatistiquesChart implements OnChanges {

  @Input()
  ventes: any[] = [];

  @ViewChild('chart')
  canvas!: ElementRef<HTMLCanvasElement>;

  graphique?: Chart;

  ngOnChanges(): void {

    if (this.canvas) {

      this.creerGraphique();

    }

  }

  creerGraphique(): void {

    if (this.graphique) {

      this.graphique.destroy();

    }

    this.graphique = new Chart(

      this.canvas.nativeElement,

      {

        type: 'line',

        data: {

          labels: this.ventes.map(v => v.label),

          datasets: [

            {

              label: "Chiffre d'affaires",

              data: this.ventes.map(v => v.montant),

              tension: .4,

              fill: true

            }

          ]

        },

        options: {

          responsive: true,

          maintainAspectRatio: false

        }

      }

    );

  }

}