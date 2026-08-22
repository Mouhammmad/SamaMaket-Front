import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarAdmin } from '../../admin/shared/sidebar-admin/sidebar-admin';
import { HeaderAdmin } from '../../admin/shared/header-admin/header-admin';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarAdmin,
    HeaderAdmin
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {}