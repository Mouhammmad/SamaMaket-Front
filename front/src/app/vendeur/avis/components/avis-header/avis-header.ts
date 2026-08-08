import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avis-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avis-header.html',
  styleUrl: './avis-header.css'
})
export class AvisHeader {

  @Input() total = 0;

}