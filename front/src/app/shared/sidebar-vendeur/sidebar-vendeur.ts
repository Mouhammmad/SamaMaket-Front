import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../core/services/auth';
import { BoutiqueService } from '../../core/services/boutique';

@Component({
  selector: 'app-sidebar-vendeur',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-vendeur.html',
  styleUrl: './sidebar-vendeur.css'
})
export class SidebarVendeur implements OnInit {
  displayName = 'Vendeur';
  boutiqueNom = 'Ma boutique';
  boutiqueStatut = 'Chargement...';

  constructor(
    public router: Router,
    private authService: AuthService,
    private boutiqueService: BoutiqueService
  ) {}

  ngOnInit(): void {
    this.displayName = this.authService.getDisplayName();
    this.chargerBoutique();
  }

  chargerBoutique(): void {
    this.boutiqueService.getMaBoutique().subscribe({
      next: (response: any) => {
        this.boutiqueNom = response?.nom || 'Ma boutique';
        this.boutiqueStatut = response?.nom ? 'Boutique active' : 'Aucune boutique';
      },
      error: () => {
        this.boutiqueNom = 'Ma boutique';
        this.boutiqueStatut = 'Aucune boutique';
      }
    });
  }

  naviguer(commande: string): void {
    this.router.navigateByUrl(commande).catch(() => {
      window.location.href = commande;
    });
  }

  deconnecter(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}