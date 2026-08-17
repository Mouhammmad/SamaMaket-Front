import { Component, Input, ViewChild, ElementRef, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-chart.html',
  styleUrl: './sales-chart.css',
})
export class SalesChart implements AfterViewInit, OnChanges, OnDestroy {
  @Input() ventes: any[] = [];

  @ViewChild('chartCanvas') canvas?: ElementRef<HTMLCanvasElement>;
  private chart: any | null = null;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderChart();
    }, 0);
  }

  ngOnChanges(): void {
    setTimeout(() => {
      this.renderChart();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  private renderChart(): void {
    if (!this.canvas?.nativeElement) {
      return;
    }

    const canvasEl = this.canvas.nativeElement;
    const labels = (this.ventes || []).map(v => v.label || '');
    const data = (this.ventes || []).map(v => Number(v.montant ?? v.revenue ?? 0));

    if (!this.ventes?.length) {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      return;
    }

    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.update();
      return;
    }

    this.chart = new Chart(canvasEl, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Ventes',
            data,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.2)',
            fill: true,
            tension: 0.3,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
