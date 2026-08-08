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
  selector: 'app-statistiques-commandes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistiques-commandes.html',
  styleUrl: './statistiques-commandes.css'
})
export class StatistiquesCommandes implements OnChanges {

  @Input()
  stats: any;

  @ViewChild('pieChart')
  pieChart!: ElementRef<HTMLCanvasElement>;

  chart?: Chart;

  ngOnChanges(): void {

    if (this.pieChart) {

      this.creerGraphique();

    }

  }

  creerGraphique(): void {

    if (this.chart) {

      this.chart.destroy();

    }

    this.chart = new Chart(

      this.pieChart.nativeElement,

      {

        type: 'doughnut',

        data: {

          labels: [

            'En attente',

            'Confirmées',

            'Expédiées',

            'Livrées',

            'Annulées'

          ],

          datasets: [

            {

              data: [

                this.stats?.en_attente || 0,

                this.stats?.confirme || 0,

                this.stats?.expedie || 0,

                this.stats?.livre || 0,

                this.stats?.annule || 0

              ]

            }

          ]

        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          plugins: {

            legend: {

              position: 'bottom'

            }

          }

        }

      }

    );

  }

}