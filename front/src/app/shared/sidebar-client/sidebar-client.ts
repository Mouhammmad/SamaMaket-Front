import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientSectionService } from '../../core/services/client-section';
import { UtilisateurService } from '../../core/services/utilisateur';
import { AuthService } from '../../core/services/auth';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-sidebar-client',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './sidebar-client.html',
  styleUrl: './sidebar-client.css'
})
export class SidebarClient implements OnInit {

  utilisateur: any = {
    first_name: 'Utilisateur',
    last_name: '',
    email: ''
  };

  section$: any;

  constructor(
    private sectionService: ClientSectionService,
    private utilisateurService: UtilisateurService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.section$ = this.sectionService.section$;
    this.chargerUtilisateur();
  }

  changerSection(section: string): void {
    console.log('Sidebar changerSection called with:', section);
    this.sectionService.changeSection(section);
    console.log('Section changed to:', section);
  }

  deconnecter(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private chargerUtilisateur(): void {
    this.utilisateurService.getProfil().subscribe({
      next: (data: any) => {
        this.utilisateur = data || this.utilisateur;
      },
      error: () => {
        // fallback values are already set.
      }
    });
  }

}