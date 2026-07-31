import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique-tabs.html',
  styleUrl: './boutique-tabs.css'
})
export class BoutiqueTabs {

  @Output() tabChanged = new EventEmitter<string>();

  active = 'produits';

  changer(tab: string) {

    this.active = tab;

    this.tabChanged.emit(tab);

  }

}