import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-promo-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promo-code.html',
  styleUrl: './promo-code.css'
})
export class PromoCode {

  @Input() codeApplique = '';

  @Output() appliquer = new EventEmitter<string>();

  code = '';

  appliquerCode() {

    if (!this.code.trim()) {
      return;
    }

    this.appliquer.emit(this.code);

  }

}