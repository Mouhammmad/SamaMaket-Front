import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, inject } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.css'
})
export class HeaderAdmin {

  administrateur = {
    nom: 'Administrateur',
    role: 'Super Admin'
  };

  afficherFormulaire = false;
  username = '';
  email = '';
  password = '';
  message = '';
  erreur = '';
  envoiEnCours = false;

  private http = inject(HttpClient);
  private changeDetectorRef = inject(ChangeDetectorRef);

  ouvrirFormulaire(): void {
    this.afficherFormulaire = true;
    this.message = '';
    this.erreur = '';
  }

  fermerFormulaire(): void {
    this.afficherFormulaire = false;
  }

  ajouterAdmin(): void {
    this.envoiEnCours = true;
    this.message = '';
    this.erreur = '';
    this.http.post('http://127.0.0.1:8000/api/dashboard/admin/admins/', {
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.envoiEnCours = false;
        this.message = 'Administrateur ajouté avec succès.';
        this.username = '';
        this.email = '';
        this.password = '';
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        this.envoiEnCours = false;
        this.erreur = error.error?.detail || 'Impossible d’ajouter l’administrateur.';
        this.changeDetectorRef.detectChanges();
      }
    });
  }

}