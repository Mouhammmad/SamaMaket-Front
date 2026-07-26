import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavorisService } from '../../core/services/favoris.service';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss']
})
export class FavorisComponent implements OnInit {
  favoris: any[] = [];

  constructor(private favorisService: FavorisService) {}

  ngOnInit() {
    this.charger();
  }

  charger() {
    this.favorisService.getMesFavoris().subscribe({ next: (data: any) => this.favoris = data });
  }

  supprimer(id: number) {
    this.favorisService.supprimer(id).subscribe({ next: () => this.charger() });
  }
}