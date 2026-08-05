import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique-navigation.html',
  styleUrl: './boutique-navigation.css'
})
export class BoutiqueNavigation {

  @Input()
  onglet = 'produits';

  @Input()
  boutique: any;

  @Output()
  changer = new EventEmitter<string>();

  selectionner(onglet: string): void {

    this.changer.emit(onglet);

  }

}