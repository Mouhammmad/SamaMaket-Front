import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

interface Notification {
  icon: string;
  title: string;
  message: string;
  action: string;
  time: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})
export class NotificationsComponent {
  activeSidebarItem = 'notifications' as const;

  notificationsRead = 0;

  marquerToutLu(): void {
    this.notificationsRead = this.notificationsToday.length + this.notificationsYesterday.length + this.notificationsWeek.length + this.notificationsOld.length;
  }

  effacerToutes(): void {
    this.notificationsToday = [];
    this.notificationsYesterday = [];
    this.notificationsWeek = [];
    this.notificationsOld = [];
  }

  notificationsToday: Notification[] = [
    {
      icon: '📦',
      title: 'Commande expédiée',
      message: 'Votre commande #SM-2025-001 est en route.',
      action: 'Suivre ma commande →',
      time: 'Il y a 15 min'
    },
    {
      icon: '🎉',
      title: 'Promotion spéciale',
      message: 'Profitez de -20 % sur les produits alimentaires.',
      action: 'Voir les offres →',
      time: 'Il y a 1 h'
    },
    {
      icon: '⭐',
      title: 'Produit favori disponible',
      message: 'Le produit que vous suivez est de nouveau en stock.',
      action: 'Voir le produit →',
      time: 'Il y a 2 h'
    }
  ];

  notificationsYesterday: Notification[] = [
    {
      icon: '🚚',
      title: 'Commande livrée',
      message: 'Votre commande #SM-2025-0008 a été livrée avec succès.',
      action: 'Voir les détails →',
      time: 'Hier'
    },
    {
      icon: '💳',
      title: 'Paiement confirmé',
      message: 'Votre paiement a été validé.',
      action: 'Voir la facture →',
      time: 'Hier'
    }
  ];

  notificationsWeek: Notification[] = [
    {
      icon: '🔔',
      title: 'Nouvelle fonctionnalité',
      message: 'Découvrez les listes de souhaits partagées.',
      action: 'En savoir plus →',
      time: 'Lundi'
    },
    {
      icon: '🎁',
      title: 'Offre de bienvenue',
      message: 'Recevez un bon d’achat de 5 000 FCFA.',
      action: 'Utiliser maintenant →',
      time: 'Dimanche'
    }
  ];

  notificationsOld: Notification[] = [
    {
      icon: '🛒',
      title: 'Merci pour votre achat',
      message: 'Nous espérons que votre commande vous satisfait.',
      action: 'Laisser un avis →',
      time: '12 juin'
    },
    {
      icon: '📢',
      title: 'Mise à jour',
      message: 'Nos conditions d’utilisation ont été modifiées.',
      action: 'Lire →',
      time: '08 juin'
    }
  ];

}