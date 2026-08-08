import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './boutique-header.html',
  styleUrl: './boutique-header.css'
})
export class BoutiqueHeader {

  @Input()
  boutique: any;

  @Output()
  suivre = new EventEmitter<void>();

  @Output()
  contacter = new EventEmitter<void>();

}