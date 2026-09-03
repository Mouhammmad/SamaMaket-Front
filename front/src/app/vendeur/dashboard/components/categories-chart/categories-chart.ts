import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-categories-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-chart.html',
  styleUrl: './categories-chart.css'
})
export class CategoriesChart implements AfterViewInit, OnChanges {
  @Input() categories: any[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private chart: Chart | null = null;
  totalSales = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.renderChart(), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories'] && !changes['categories'].firstChange) {
      setTimeout(() => this.renderChart(), 0);
    }
  }

  renderChart(): void {
    if (!this.chartCanvas || !this.categories || this.categories.length === 0) return;

    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Destroy existing chart
    if (this.chart) {
      this.chart.destroy();
    }

    // Calculate total sales for percentages
    this.totalSales = this.categories.reduce((sum, cat) => sum + (cat.sales || 0), 0);

    // Color palette for charts
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6C63FF', '#FF8B94', '#A8E6CF', '#FFD3B6', '#FFAAA5'];

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.categories.map(cat => cat.category),
        datasets: [
          {
            data: this.categories.map(cat => cat.sales || 0),
            backgroundColor: colors.slice(0, this.categories.length),
            borderColor: '#fff',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: {
                size: 12
              }
            }
          }
        }
      }
    });

    this.cdr.detectChanges();
  }

  getPercentage(sales: number): string {
    if (this.totalSales === 0) return '0%';
    return Math.round((sales / this.totalSales) * 100) + '%';
  }
}
