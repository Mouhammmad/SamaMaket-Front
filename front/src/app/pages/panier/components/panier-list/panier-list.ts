import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier-list.html',
  styleUrl: './panier-list.css'
})
export class PanierList {

  @Input() articles: any[] = [];

  @Output() augmenter = new EventEmitter<any>();

  @Output() diminuer = new EventEmitter<any>();

  @Output() supprimer = new EventEmitter<any>();

  @Output() sauvegarder = new EventEmitter<any>();

}