import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-promo-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promo-code.html',
  styleUrl: './promo-code.css'
})
export class PromoCode implements OnChanges {

  @Input() codeApplique = '';

  @Output() appliquer = new EventEmitter<string>();

  code = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['codeApplique']) {
      this.code = this.codeApplique || '';
    }
  }

  appliquerCode() {
    this.appliquer.emit(this.code.trim());
  }

}