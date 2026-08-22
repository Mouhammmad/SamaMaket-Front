import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CommandeService } from '../../../../core/services/commandes';
import { UtilisateurService } from '../../../../core/services/utilisateur';

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

  private notificationsSubject = new BehaviorSubject<any[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private chargementSubject = new BehaviorSubject(false);
  chargement$ = this.chargementSubject.asObservable();

  private messageSubject = new BehaviorSubject('');
  message$ = this.messageSubject.asObservable();

  constructor(
    private commandeService: CommandeService,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.chargerNotifications();
  }

  chargerNotifications(): void {
    this.chargementSubject.next(true);
    this.messageSubject.next('');
    this.commandeService.getNotifications().subscribe({
      next: (data: any) => {
        const newNotifications = Array.isArray(data) ? data : data.results || [];
        this.notificationsSubject.next(newNotifications);
        this.messageSubject.next(newNotifications.length ? '' : 'Aucune notification pour le moment.');
        this.chargementSubject.next(false);
      },
      error: () => {
        this.messageSubject.next('Impossible de charger les notifications.');
        this.notificationsSubject.next([]);
        this.chargementSubject.next(false);
      }
    });
  }

  marquerToutesLues(): void {
    this.commandeService.marquerToutesNotificationsLues().subscribe({
      next: () => {
        const updatedNotifications = this.notificationsSubject.getValue().map(notification => ({
          ...notification,
          est_lu: true
        }));
        this.notificationsSubject.next(updatedNotifications);
      },
      error: () => {
        alert('Impossible de marquer les notifications comme lues.');
      }
    });
  }

  enregistrer() {
    // Enregistrer les préférences via l'API utilisateur
    const payload = {
      notif_commandes: this.commandes,
      notif_promos: this.promotions,
      notif_favoris: this.favoris,
      notif_newsletter: this.newsletter
    };

    // utiliser le endpoint de modification de profil
    // on récupère d'abord le profil, puis on envoie la mise à jour
    // pour éviter d'écraser d'autres champs, on récupère le profil actuel
    this.utilisateurService.getProfil().subscribe({
      next: (profil: any) => {
        const data = { ...profil, ...payload };
        this.utilisateurService.modifierProfil(data).subscribe({
          next: () => alert('Préférences enregistrées avec succès.'),
          error: () => alert('Impossible d\'enregistrer les préférences.')
        });
      },
      error: () => alert('Impossible de récupérer le profil pour enregistrer les préférences.')
    });

  }

}