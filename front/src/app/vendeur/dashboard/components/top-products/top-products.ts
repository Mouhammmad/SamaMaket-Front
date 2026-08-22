import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-products.html',
  styleUrl: './top-products.css',
})
export class TopProducts {
  @Input() products: any[] = [];
}
