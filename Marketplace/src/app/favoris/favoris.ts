import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FavorisService, FavoriApiItem } from '../services/favoris.service';
import { PanierService } from '../services/panier.service';

interface Favori {
  id: number;
  nom: string;
  boutique: string;
  image: string;
  prix: number;
  ancienPrix?: number;
  badge: string;
  badgeClass: string;
}

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterLink],
  templateUrl: './favoris.html',
  styleUrls: ['./favoris.scss']
})
export class FavoritesComponent implements OnInit {
  activeSidebarItem = 'favoris' as const;

  favoris: Favori[] = [];

  suggestions: Favori[] = [

    {
      id:7,
      nom:'Tissu Kenté',
      boutique:'',
      image:'assets/images/tissu.png',
      prix:9800,
      badge:'',
      badgeClass:''
    },

    {
      id:8,
      nom:'Savon Beurre',
      boutique:'',
      image:'assets/images/savon.png',
      prix:2500,
      badge:'',
      badgeClass:''
    },

    {
      id:9,
      nom:'Bracelet Argent',
      boutique:'',
      image:'assets/images/bracelet.png',
      prix:14000,
      badge:'',
      badgeClass:''
    },

    {
      id:10,
      nom:'Chapeau Paille',
      boutique:'',
      image:'assets/images/chapeau.png',
      prix:5500,
      badge:'',
      badgeClass:''
    }

  ];

  constructor(
    private favorisService: FavorisService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.chargerFavoris();
  }

  chargerFavoris(): void {
    this.favorisService.getFavoris().subscribe({
      next: (data: FavoriApiItem[]) => {
        this.favoris = data.map((item) => this.mapFavori(item));
      },
      error: () => {
        this.favoris = [];
      }
    });
  }

  ajouterAuPanier(produit: Favori): void {
    this.panierService.ajouter({ produit_id: produit.id, quantite: 1 }).subscribe({
      next: () => console.log('Ajout au panier depuis favoris'),
      error: (err) => console.error(err)
    });
  }

  supprimerFavori(id: number): void {
    this.favorisService.supprimerFavori(id).subscribe({
      next: () => {
        this.favoris = this.favoris.filter((p) => p.id !== id);
      },
      error: () => {
        this.favoris = this.favoris.filter((p) => p.id !== id);
      }
    });
  }

  viderFavoris(): void {
    this.favoris.forEach((item) => this.supprimerFavori(item.id));
  }

  toutAjouterAuPanier(): void {
    this.favoris.forEach((produit) => this.ajouterAuPanier(produit));
  }

  private mapFavori(item: FavoriApiItem): Favori {
    const produit = item.produit;
    return {
      id: item.id,
      nom: produit?.nom || 'Produit',
      boutique: produit?.boutique || 'Boutique',
      image: produit?.image_url || produit?.image || 'assets/images/no-image.png',
      prix: Number(produit?.prix || 0),
      badge: '',
      badgeClass: ''
    };
  }

}