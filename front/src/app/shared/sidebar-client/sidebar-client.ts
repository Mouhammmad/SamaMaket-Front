import { Component, OnInit } from '@angular/core';
import { ClientSectionService } from '../../core/services/client-section';
import { UtilisateurService } from '../../core/services/utilisateur';
@Component({
  selector: 'app-sidebar-client',
  standalone: true,
  templateUrl: './sidebar-client.html',
  styleUrl: './sidebar-client.css'
})
export class SidebarClient implements OnInit {

  utilisateur: any = {
    prenom: 'Utilisateur',
    nom: '',
    email: ''
  };

  constructor(
    private sectionService: ClientSectionService,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.chargerUtilisateur();
  }

  changerSection(section: string): void {
    this.sectionService.changeSection(section);
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