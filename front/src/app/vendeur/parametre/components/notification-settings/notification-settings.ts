import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ParametresBoutique } from '../../../../core/services/parametre-boutique';

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notification-settings.html',
  styleUrl: './notification-settings.css'
})
export class NotificationSettings implements OnChanges {

  @Input() parametres: ParametresBoutique | null = null;

  @Input() enregistrement = false;

  @Output() modifier =
    new EventEmitter<Partial<ParametresBoutique>>();

  notificationsCommandes = true;

  notificationsAvis = true;

  notificationsMessages = true;


  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['parametres'] &&
      this.parametres
    ) {

      this.notificationsCommandes =
        this.parametres.notifications_commandes ?? true;

      this.notificationsAvis =
        this.parametres.notifications_avis ?? true;

      this.notificationsMessages =
        this.parametres.notifications_messages ?? true;
    }
  }


  changerCommandes(): void {
    this.notificationsCommandes =
      !this.notificationsCommandes;
  }


  changerAvis(): void {
    this.notificationsAvis =
      !this.notificationsAvis;
  }


  changerMessages(): void {
    this.notificationsMessages =
      !this.notificationsMessages;
  }


  enregistrer(): void {

    this.modifier.emit({

      notifications_commandes:
        this.notificationsCommandes,

      notifications_avis:
        this.notificationsAvis,

      notifications_messages:
        this.notificationsMessages

    });
  }
}