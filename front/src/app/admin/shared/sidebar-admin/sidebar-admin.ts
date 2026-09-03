import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar-admin.html',
  styleUrl: './sidebar-admin.css'
})
export class SidebarAdmin {

  nomAdmin: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.nomAdmin = this.authService.getDisplayName();
  }

  deconnecter(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

}