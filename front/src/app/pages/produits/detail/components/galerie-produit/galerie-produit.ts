import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galerie-produit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galerie-produit.html',
  styleUrl: './galerie-produit.css'
})
export class GalerieProduit implements OnChanges {

  @Input()
  produit: any;

  imageActive = '';

  images: string[] = [];

  ngOnChanges(): void {

    if (!this.produit) return;

    this.images = [];

    if (this.produit.image_url) {

      this.images.push(this.produit.image_url);

    }

    if (this.produit.images?.length) {

      this.images.push(...this.produit.images);

    }

    if (this.images.length) {

      this.imageActive = this.images[0];

    }

  }

  changerImage(image: string): void {

    this.imageActive = image;

  }

}