import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Chart,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-promotion-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-chart.html',
  styleUrl: './promotion-chart.css'
})
export class PromotionChart implements OnChanges {

  @Input() promotions: any[] = [];

  @ViewChild('chart')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: Chart | undefined;

  ngOnChanges(): void {

    setTimeout(() => {

      this.creerGraphique();

    });

  }

  private estPromotionActive(promotion: any): boolean {
    const valeur = promotion?.est_active ?? promotion?.est_actif;

    if (typeof valeur === 'boolean') {
      return valeur;
    }

    if (typeof valeur === 'string') {
      return ['true', '1', 'yes', 'oui', 'active'].includes(valeur.toLowerCase());
    }

    if (typeof valeur === 'number') {
      return valeur === 1;
    }

    return Boolean(valeur);
  }

  creerGraphique() {

    if (!this.chartCanvas) return;

    this.chart?.destroy();

    const actives =
      this.promotions.filter(p => this.estPromotionActive(p)).length;

    const inactives =
      this.promotions.filter(p => !this.estPromotionActive(p)).length;

    this.chart = new Chart(

      this.chartCanvas.nativeElement,

      {

        type: 'doughnut',

        data: {

          labels: [

            'Actives',

            'Inactives'

          ],

          datasets: [

            {

              data: [

                actives,

                inactives

              ]

            }

          ]

        },

        options: {

          responsive: true,

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