import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SidebarVendeur } from '../../shared/sidebar-vendeur/sidebar-vendeur';

@Component({
  selector: 'app-vendeur-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    SidebarVendeur
  ],
  templateUrl: './vendeur-layout.html',
  styleUrl: './vendeur-layout.css'
})
export class VendeurLayout {

}