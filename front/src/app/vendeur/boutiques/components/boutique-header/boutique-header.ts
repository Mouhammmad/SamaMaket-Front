import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique-header.html',
  styleUrl: './boutique-header.css'
})
export class BoutiqueHeader {

  @Input() boutique: any;

  @Output() logoSelected = new EventEmitter<Event>();

  @Output() banniereSelected = new EventEmitter<Event>();

  onLogoSelected(event: Event) {
    this.logoSelected.emit(event);
  }

  onBanniereSelected(event: Event) {
    this.banniereSelected.emit(event);
  }

}