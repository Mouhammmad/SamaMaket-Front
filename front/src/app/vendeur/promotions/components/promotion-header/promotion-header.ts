import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotion-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-header.html',
  styleUrl: './promotion-header.css'
})
export class PromotionHeader {

  @Input() total = 0;

  @Output() ajouter = new EventEmitter<void>();

}