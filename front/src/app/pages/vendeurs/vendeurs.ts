import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Boutique } from '../../core/services/boutique';

@Component({
  selector: 'app-vendeurs-public',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendeurs.html',
  styleUrl: './vendeurs.css'
})
export class VendeursPage implements OnInit {
  boutiques: any[] = [];
  chargement = true;
  erreur = false;

  constructor(
    private boutiqueService: Boutique,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerVendeurs();
  }

  chargerVendeurs(): void {
    this.chargement = true;
    this.erreur = false;

    this.boutiqueService.getBoutiques().subscribe({
      next: (response: any) => {
        this.boutiques = Array.isArray(response)
          ? response
          : Array.isArray(response?.results)
            ? response.results
            : response?.results || [];
        this.chargement = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.boutiques = [];
        this.erreur = true;
        this.chargement = false;
        this.cdr.detectChanges();
      }
    });
  }

  getLogo(boutique: any): string {
    return boutique.logo || boutique.logo_url || boutique.image || 'assets/images/default-vendor.png';
  }

  getStatut(boutique: any): string {
    if (boutique.approuvé || boutique['approuvé'] || boutique.est_active || boutique.statut === 'approuvé') {
      return 'Approuvée';
    }
    return 'En attente';
  }
}
