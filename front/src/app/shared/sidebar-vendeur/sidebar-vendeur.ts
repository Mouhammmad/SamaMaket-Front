import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-vendeur',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar-vendeur.html',
  styleUrl: './sidebar-vendeur.css'
})
export class SidebarVendeur {

}