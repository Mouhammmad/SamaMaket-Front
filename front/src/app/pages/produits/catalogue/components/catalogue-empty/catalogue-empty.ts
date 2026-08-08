import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogue-empty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogue-empty.html',
  styleUrl: './catalogue-empty.css'
})
export class CatalogueEmpty {

  @Output()
  reinitialiser = new EventEmitter<void>();

}