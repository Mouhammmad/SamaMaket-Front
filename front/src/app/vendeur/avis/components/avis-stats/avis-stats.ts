import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avis-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avis-stats.html',
  styleUrl: './avis-stats.css'
})
export class AvisStats implements OnChanges {

  @Input() avis: any[] = [];

  moyenne = 0;

  total = 0;

  repartition = {
    cinq: 0,
    quatre: 0,
    trois: 0,
    deux: 0,
    un: 0
  };

  ngOnChanges(): void {

    this.calculerStatistiques();

  }

  calculerStatistiques(): void {

    this.total = this.avis.length;

    if (!this.total) {

      this.moyenne = 0;

      return;

    }

    let somme = 0;

    this.repartition = {
      cinq: 0,
      quatre: 0,
      trois: 0,
      deux: 0,
      un: 0
    };

    this.avis.forEach(a => {

      somme += a.note;

      switch (a.note) {

        case 5:
          this.repartition.cinq++;
          break;

        case 4:
          this.repartition.quatre++;
          break;

        case 3:
          this.repartition.trois++;
          break;

        case 2:
          this.repartition.deux++;
          break;

        case 1:
          this.repartition.un++;
          break;

      }

    });

    this.moyenne = Number((somme / this.total).toFixed(1));

  }

}