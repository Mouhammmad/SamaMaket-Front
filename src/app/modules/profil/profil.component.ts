import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilService } from '../../core/services/profil.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  profil: any = null;
  ancienMdp = '';
  nouveauMdp = '';
  messageMdp = '';
  messageSucces = '';

  constructor(private profilService: ProfilService) {}

  ngOnInit() {
    this.profilService.getProfil().subscribe({ next: (data: any) => this.profil = data });
  }

  enregistrer() {
    this.profilService.modifier({ telephone: this.profil.telephone, adresse: this.profil.adresse }).subscribe({
      next: () => this.messageSucces = 'Profil mis à jour !',
      error: () => this.messageSucces = 'Erreur lors de la mise à jour'
    });
  }

  changerMdp() {
    this.profilService.changerMotDePasse(this.ancienMdp, this.nouveauMdp).subscribe({
      next: () => this.messageMdp = 'Mot de passe changé avec succès !',
      error: () => this.messageMdp = 'Ancien mot de passe incorrect'
    });
  }
}