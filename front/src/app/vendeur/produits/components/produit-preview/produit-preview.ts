import { Component, EventEmitter, Output, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PreviewService } from '../../../../core/services/preview.service';

@Component({
  selector: 'app-produit-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produit-preview.html',
  styleUrls: ['./produit-preview.css']
})
export class ProduitPreview {

  produit: any = null;
  @Output() fermer = new EventEmitter<void>();
  imageActive = '';
  images: any[] = [];
  sub: Subscription | null = null;

  constructor(public previewService: PreviewService, private cdr: ChangeDetectorRef) {
    this.sub = this.previewService.current$.subscribe(p => {
      this.produit = p;
      if (!p) {
        this.images = [];
        this.imageActive = '';
        setTimeout(() => this.cdr.detectChanges());
        return;
      }
      this.images = p.images || [];
      if (this.images.length > 0) {
        this.imageActive = this.images[0].image_url;
      } else {
        this.imageActive = p.image_url || '';
      }
      setTimeout(() => this.cdr.detectChanges());
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }


changerImage(image: any): void {

  this.imageActive = image.image_url;

}

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.previewService.close();
    }
  }
}