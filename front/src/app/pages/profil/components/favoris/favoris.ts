import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriService } from '../../../../core/services/favori.service';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoris.html',
  styleUrl: './favoris.css',
})
export class Favoris implements OnInit {

  favoris: any[] = [];
  chargement = true;
  message = '';

  constructor(
    private favoriService: FavoriService
  ) {}

  ngOnInit(): void {
    this.chargerFavoris();
  }

  chargerFavoris(): void {
    this.chargement = true;
    this.favoriService.getFavoris().subscribe({
      next: (data: any) => {
        this.favoris = Array.isArray(data) ? data : data.results || [];
        if (!this.favoris.length) {
          this.message = 'Vous n’avez pas de favoris pour le moment.';
        } else {
          this.message = '';
        }
        this.chargement = false;
      },
      error: () => {
        this.message = 'Impossible de charger vos favoris.';
        this.favoris = [];
        this.chargement = false;
      }
    });
  }

}
