
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {

  @Input() title = '';

  @Input() isOpen = false;

  @Output() close = new EventEmitter<void>();

  fermer() {
    this.close.emit();
  }

}