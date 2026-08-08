import { Component } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.css'
})
export class HeaderAdmin {

  administrateur = {
    nom: 'Administrateur',
    role: 'Super Admin'
  };

}