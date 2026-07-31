import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-sidebar-vendeur',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-vendeur.html',
  styleUrl: './sidebar-vendeur.css'
})
export class SidebarVendeur implements OnInit {
  displayName = 'Vendeur';

  constructor(
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.displayName = this.authService.getDisplayName();
  }

  naviguer(commande: string): void {
    this.router.navigateByUrl(commande).catch(() => {
      window.location.href = commande;
    });
  }
}