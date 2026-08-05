import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-livraison-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livraison-list.html',
  styleUrl: './livraison-list.css'
})
export class LivraisonList {

  @Input() livraisons: any[] = [];

  @Output() selection = new EventEmitter<any>();

  ouvrirLivraison(livraison: any): void {

    this.selection.emit(livraison);

  }

  badgeClass(statut: string): string {

    switch (statut) {

      case 'en_preparation':
        return 'preparation';

      case 'expedie':
        return 'expedie';

      case 'en_transit':
        return 'transit';

      case 'livre':
        return 'livre';

      case 'echoue':
        return 'echoue';

      default:
        return '';
    }

  }

}