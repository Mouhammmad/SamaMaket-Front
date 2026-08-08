import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandeService } from '../../../../core/services/commandes';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './notifications-profil.html',
  styleUrl: './notifications-profil.css'
})
export class Notifications implements OnInit {

  commandes = true;

  promotions = true;

  favoris = false;

  newsletter = true;

  notifications: any[] = [];

  chargement = false;

  message = '';

  constructor(
    private commandeService: CommandeService
  ) {}

  ngOnInit(): void {
    this.chargerNotifications();
  }

  chargerNotifications(): void {
    this.chargement = true;
    this.message = '';
    this.commandeService.getNotifications().subscribe({
      next: (data: any) => {
        this.notifications = Array.isArray(data) ? data : data.results || [];
        this.message = this.notifications.length ? '' : 'Aucune notification pour le moment.';
        this.chargement = false;
      },
      error: () => {
        this.message = 'Impossible de charger les notifications.';
        this.notifications = [];
        this.chargement = false;
      }
    });
  }

  marquerToutesLues(): void {
    this.commandeService.marquerToutesNotificationsLues().subscribe({
      next: () => {
        this.notifications = this.notifications.map(notification => ({
          ...notification,
          est_lu: true
        }));
      },
      error: () => {
        alert('Impossible de marquer les notifications comme lues.');
      }
    });
  }

  enregistrer() {

    alert("Préférences enregistrées avec succès.");

  }

}