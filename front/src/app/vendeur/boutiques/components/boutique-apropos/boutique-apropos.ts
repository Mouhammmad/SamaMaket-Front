import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique-apropos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique-apropos.html',
  styleUrl: './boutique-apropos.css'
})
export class BoutiqueApropos{

  @Input()
  boutique:any;

}