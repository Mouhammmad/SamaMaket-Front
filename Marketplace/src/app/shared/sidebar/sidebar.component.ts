import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type SidebarItemKey = 'profil' | 'commandes' | 'favoris' | 'notifications' | 'adresses' | 'avis' | 'securite' | 'logout';

interface SidebarItem {
  key: SidebarItemKey;
  label: string;
  route: string;
  badge?: string;
  isLogout?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() activeItem: SidebarItemKey = 'profil';

  readonly items: SidebarItem[] = [
    { key: 'profil', label: 'Mon profil', route: '/profil' },
    { key: 'commandes', label: 'Mes commandes', route: '/mes-commandes' },
    { key: 'favoris', label: 'Mes favoris', route: '/favoris' },
    { key: 'adresses', label: 'Mes adresses', route: '/profil' },
    { key: 'notifications', label: 'Notifications', route: '/notifications', badge: '5' },
    { key: 'avis', label: 'Mes avis', route: '/profil' },
    { key: 'securite', label: 'Sécurité', route: '/profil' },
    { key: 'logout', label: 'Déconnexion', route: '/accueil', isLogout: true }
  ];
}
