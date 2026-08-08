import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-panier-header',
  standalone: true,
  templateUrl: './panier-header.html',
  styleUrl: './panier-header.css'
})
export class PanierHeader {

  @Input() nombreArticles = 0;

  @Output() vider = new EventEmitter<void>();

}