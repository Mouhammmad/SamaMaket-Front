import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FavoriService } from '../../../../../core/services/favori.service';

@Component({
  selector: 'app-produit-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './produit-card.html',
  styleUrl: './produit-card.css'
})
export class ProduitCard {

  constructor(
    private favoriService: FavoriService,
    private router: Router
  ) {}

  @Input()
  produit: any;

  @Output()
  voir = new EventEmitter<number>();

  @Output()
  ajouter = new EventEmitter<number>();

  @Output()
  favori = new EventEmitter<number>();

  getImage(): string {

    return (
      this.produit?.image_url ||
      this.produit?.image ||
      'assets/images/default-product.png'
    );

  }

  estEnPromotion(): boolean {

    return !!this.produit?.ancien_prix;

  }
toggleFavori(produit:any){

    this.favoriService.toggle(

        produit.id

    ).subscribe({

        next:(response:any)=>{

            produit.est_favori = response.favori;

        }

    });

}
voirProduit(){
    const produitId = this.produit?.id;
    if (produitId == null) {
      console.error('Produit sans ID:', this.produit);
      return;
    }

    this.voir.emit(produitId);
    this.router.navigate(['/produit', produitId]);
}

ajouterPanier(){

    this.ajouter.emit(

        this.produit.id

    );

}


}