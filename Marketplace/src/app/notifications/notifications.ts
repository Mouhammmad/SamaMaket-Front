import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { CommandeService, NotificationItem } from '../services/commande.service';

interface DisplayNotification {
  id: number;
  commande: number | null;
  title: string;
  message: string;
  action: string;
  icon: string;
  time: string;
  est_lu: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})
export class NotificationsComponent implements OnInit {
  activeSidebarItem = 'notifications' as const;

  notificationsRead = 0;

  notificationsToday: DisplayNotification[] = [];
  notificationsYesterday: DisplayNotification[] = [];
  notificationsWeek: DisplayNotification[] = [];
  notificationsOld: DisplayNotification[] = [];

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.commandeService.getNotifications().subscribe({
      next: (notifications) => {
        const items = Array.isArray(notifications) ? notifications : [];
        const mapped = items.map((item) => this.toDisplayNotification(item));
        this.groupNotifications(mapped);
        this.notificationsRead = items.filter((n) => n.est_lu).length;
      },
      error: (err) => {
        console.error('Impossible de charger les notifications', err);
      }
    });
  }

  toDisplayNotification(item: NotificationItem): DisplayNotification {
    return {
      id: item.id,
      commande: item.commande,
      title: item.titre,
      message: item.message,
      action: this.getActionLabel(item.type),
      icon: this.getIcon(item.type),
      time: item.date_creation,
      est_lu: item.est_lu,
    };
  }

  groupNotifications(items: DisplayNotification[]): void {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    this.notificationsToday = [];
    this.notificationsYesterday = [];
    this.notificationsWeek = [];
    this.notificationsOld = [];

    items.forEach((item) => {
      const date = this.parseDate(item.time);
      if (!date) {
        this.notificationsOld.push(item);
        return;
      }

      if (date >= today) {
        this.notificationsToday.push(item);
      } else if (date >= yesterday) {
        this.notificationsYesterday.push(item);
      } else if (date >= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)) {
        this.notificationsWeek.push(item);
      } else {
        this.notificationsOld.push(item);
      }
    });
  }

  parseDate(value: string): Date | null {
    const parts = value.split(' ');
    if (parts.length !== 2) {
      return null;
    }
    const [datePart, timePart] = parts;
    const dateParts = datePart.split('/').map((s) => Number(s));
    const timeParts = timePart.split(':').map((s) => Number(s));
    if (dateParts.length !== 3 || timeParts.length !== 2) {
      return null;
    }
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1]);
  }

  marquerToutLu(): void {
    this.commandeService.markNotificationsRead().subscribe({
      next: () => {
        this.notificationsToday = this.notificationsToday.map((n) => ({ ...n, est_lu: true }));
        this.notificationsYesterday = this.notificationsYesterday.map((n) => ({ ...n, est_lu: true }));
        this.notificationsWeek = this.notificationsWeek.map((n) => ({ ...n, est_lu: true }));
        this.notificationsOld = this.notificationsOld.map((n) => ({ ...n, est_lu: true }));
        this.notificationsRead = this.notificationsToday.length + this.notificationsYesterday.length + this.notificationsWeek.length + this.notificationsOld.length;
      },
      error: (err) => {
        console.error('Impossible de marquer toutes les notifications comme lues', err);
      }
    });
  }

  effacerToutes(): void {
    this.notificationsToday = [];
    this.notificationsYesterday = [];
    this.notificationsWeek = [];
    this.notificationsOld = [];
    this.notificationsRead = 0;
  }

  getIcon(type: string): string {
    switch (type) {
      case 'commande':
        return '📦';
      case 'paiement':
        return '💳';
      case 'livraison':
        return '🚚';
      case 'systeme':
        return '🔔';
      default:
        return '📣';
    }
  }

  getActionLabel(type: string): string {
    switch (type) {
      case 'commande':
        return 'Voir la commande →';
      case 'paiement':
        return 'Voir le paiement →';
      case 'livraison':
        return 'Suivre la livraison →';
      default:
        return 'Voir les détails →';
    }
  }
}
