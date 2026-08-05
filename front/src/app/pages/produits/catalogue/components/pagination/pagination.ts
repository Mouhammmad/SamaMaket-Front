import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class Pagination {

  @Input()
  page = 1;

  @Input()
  pages = 1;

  @Output()
  changer = new EventEmitter<number>();

  precedent(): void {

    if (this.page > 1) {

      this.changer.emit(this.page - 1);

    }

  }

  suivant(): void {

    if (this.page < this.pages) {

      this.changer.emit(this.page + 1);

    }

  }

  aller(page: number): void {

    this.changer.emit(page);

  }

  get numeros(): number[] {

    return Array.from(
      { length: this.pages },
      (_, index) => index + 1
    );

  }

}