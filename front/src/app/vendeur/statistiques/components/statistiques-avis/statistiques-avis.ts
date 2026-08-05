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
  selector: 'app-statistiques-avis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistiques-avis.html',
  styleUrl: './statistiques-avis.css'
})
export class StatistiquesAvis implements OnChanges {

  @Input()
  stats: any;

  @ViewChild('avisChart')
  avisChart!: ElementRef<HTMLCanvasElement>;

  chart?: Chart;

  ngOnChanges(): void {

    if (this.avisChart) {

      this.creerGraphique();

    }

  }

  creerGraphique(): void {

    if (this.chart) {

      this.chart.destroy();

    }

    this.chart = new Chart(

      this.avisChart.nativeElement,

      {

        type: 'bar',

        data: {

          labels: [
            '5 ★',
            '4 ★',
            '3 ★',
            '2 ★',
            '1 ★'
          ],

          datasets: [

            {

              label: 'Nombre d’avis',

              data: [

                this.stats?.avis?.cinq || 0,
                this.stats?.avis?.quatre || 0,
                this.stats?.avis?.trois || 0,
                this.stats?.avis?.deux || 0,
                this.stats?.avis?.un || 0

              ]

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