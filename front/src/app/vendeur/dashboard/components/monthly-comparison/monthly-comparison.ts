import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-monthly-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monthly-comparison.html',
  styleUrl: './monthly-comparison.css'
})
export class MonthlyComparison implements AfterViewInit, OnChanges {
  @Input() ventes: any[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private chart: Chart | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.renderChart(), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ventes'] && !changes['ventes'].firstChange) {
      setTimeout(() => this.renderChart(), 0);
    }
  }

  renderChart(): void {
    if (!this.chartCanvas) return;

    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Destroy existing chart
    if (this.chart) {
      this.chart.destroy();
    }

    // Prepare data - compare current with previous month
    const data = this.prepareData();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Mois actuels',
            data: data.currentMonth,
            backgroundColor: '#5b93d6',
            borderColor: '#5b93d6',
            borderWidth: 1
          },
          {
            label: 'Mois précédents',
            data: data.previousMonth,
            backgroundColor: '#d4dce6',
            borderColor: '#d4dce6',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 15
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    this.cdr.detectChanges();
  }

  prepareData() {
    if (!this.ventes || this.ventes.length === 0) {
      return { labels: [], currentMonth: [], previousMonth: [] };
    }

    const labels = this.ventes.map(item => item.label);
    
    // Split data into two groups for comparison
    const midpoint = Math.ceil(this.ventes.length / 2);
    const currentMonth = this.ventes.slice(midpoint).map(item => item.montant || item.revenue || 0);
    const previousMonth = this.ventes.slice(0, midpoint).map(item => item.montant || item.revenue || 0);

    return { labels, currentMonth, previousMonth };
  }
}
