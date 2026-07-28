import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SidebarClient } from '../../shared/sidebar-client/sidebar-client';
import { Profil } from '../../pages/profil/profil';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [
    RouterLink,
    SidebarClient,
    Profil
  ],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.css'
})
export class ClientLayout {

}