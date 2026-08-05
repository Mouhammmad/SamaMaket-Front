import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique-categories',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './boutique-categories.html',
  styleUrl: './boutique-categories.css'
})
export class BoutiqueCategories {

  @Input()
  boutique: any;

}