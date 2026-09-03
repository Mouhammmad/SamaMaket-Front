import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminParametresService } from '../../core/services/admin-parametres';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametres.html',
  styleUrl: './parametres.css'
})
export class Parametres implements OnInit {

  nomPlateforme = 'SAMA MARKET';
  emailContact = '';
  description = '';

  notificationsCommandes = true;
  notificationsVendeurs = true;
  notificationsSysteme = true;

  validationVendeurs = true;

  chargement = true;
  sauvegardeEnCours = false;
  message = '';
  erreur = '';

  constructor(
    private parametresService: AdminParametresService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerParametres();
  }

  chargerParametres(): void {
    this.chargement = true;
    this.erreur = '';
    this.parametresService.getParametres().subscribe({
      next: (parametres) => {
        this.nomPlateforme = parametres.nom_plateforme;
        this.emailContact = parametres.email_contact;
        this.description = parametres.description;
        this.validationVendeurs = parametres.validation_vendeurs;
        this.notificationsCommandes = parametres.notifications_commandes;
        this.notificationsVendeurs = parametres.notifications_vendeurs;
        this.notificationsSysteme = parametres.notifications_systeme;
        this.chargement = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.erreur = 'Impossible de charger les paramètres.';
        this.chargement = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  sauvegarder(): void {
    this.sauvegardeEnCours = true;
    this.message = '';
    this.erreur = '';
    this.parametresService.sauvegarder({
      nom_plateforme: this.nomPlateforme,
      email_contact: this.emailContact,
      description: this.description,
      validation_vendeurs: this.validationVendeurs,
      notifications_commandes: this.notificationsCommandes,
      notifications_vendeurs: this.notificationsVendeurs,
      notifications_systeme: this.notificationsSysteme
    }).subscribe({
      next: (parametres) => {
        this.nomPlateforme = parametres.nom_plateforme;
        this.emailContact = parametres.email_contact;
        this.description = parametres.description;
        this.sauvegardeEnCours = false;
        this.message = 'Paramètres enregistrés avec succès.';
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.sauvegardeEnCours = false;
        this.erreur = 'Impossible d’enregistrer les paramètres.';
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}