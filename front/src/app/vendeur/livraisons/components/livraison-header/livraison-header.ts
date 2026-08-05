import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-livraison-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livraison-header.html',
  styleUrl: './livraison-header.css'
})
export class LivraisonHeader {

  @Input() total = 0;

}