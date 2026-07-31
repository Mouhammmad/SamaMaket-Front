import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewService } from '../../../../core/services/preview.service';

@Component({
  selector: 'app-produit-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produit-table.html',
  styleUrls: ['./produit-table.css']
})
export class ProduitTable {

  private _produits: any[] = [];
  menuOuvert: number | null = null;

  @Input()
  set produits(value: any[]) {
    this._produits = value || [];
  }

  get produits(): any[] {
    return this._produits;
  }

  @Output() modifier = new EventEmitter<any>();

  @Output() supprimer = new EventEmitter<any>();

  @Output() dupliquer = new EventEmitter<any>();

  @Output() apercu = new EventEmitter<any>();

  @Output() augmenter = new EventEmitter<any>();

  @Output() diminuer = new EventEmitter<any>();

  @Output() statut = new EventEmitter<any>();
  @Output()
  voir = new EventEmitter<any>();

  constructor(private previewService: PreviewService) {}

  augmenterStock(produit: any): void {

    this.augmenter.emit(produit);

  }

  diminuerStock(produit: any): void {

    this.diminuer.emit(produit);

  }

  changerStatut(produit: any): void {

    this.statut.emit(produit);

  }

  triggerApercu(produit: any): void {

    try {
      this.apercu.emit(produit);
      // try to call parent directly as a fallback
      const root = (document.querySelector('app-produits') as any);
      const ng = (window as any).ng;
      if (ng && root) {
        const parent = ng.getComponent(root);
        if (parent && typeof parent.ouvrirPreview === 'function') {
          parent.ouvrirPreview(produit);
        }
      }
    } catch (e) {
      console.warn('triggerApercu fallback failed', e);
    }

  }

  toggleMenu(id: number): void {

    if (this.menuOuvert === id) {

      this.menuOuvert = null;

    } else {

      this.menuOuvert = id;

    }

  }

  openPreviewLocal(produit: any): void {
    console.log('[ProduitTable] openPreviewLocal', produit && produit.id);
    this.previewService.open(produit);
    // close the menu to ensure preview overlay appears above
    this.menuOuvert = null;
  }

}