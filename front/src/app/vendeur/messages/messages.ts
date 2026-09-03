import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BoutiqueService, Conversation } from '../../core/services/boutique';

@Component({
  selector: 'app-vendeur-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class VendeurMessages implements OnInit {
  conversations: Conversation[] = [];
  conversationActive: Conversation | null = null;
  messages: any[] = [];
  nouveauMessage = '';
  chargement = true;
  envoiEnCours = false;
  erreur = '';

  constructor(
    private boutiqueService: BoutiqueService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerConversations();
  }

  chargerConversations(): void {
    this.chargement = true;
    this.boutiqueService.getConversations().subscribe({
      next: (conversations) => {
        this.conversations = conversations;
        this.chargement = false;
        if (conversations.length > 0) {
          this.selectionner(conversations[0]);
        }
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        this.chargement = false;
        this.erreur = error?.error?.detail || 'Impossible de charger les messages clients.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  selectionner(conversation: Conversation): void {
    this.conversationActive = conversation;
    this.messages = [];
    this.boutiqueService.getConversationMessages(conversation.id).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.erreur = 'Impossible de charger cette conversation.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  envoyer(): void {
    const contenu = this.nouveauMessage.trim();
    const conversationId = this.conversationActive?.id;
    if (!contenu || !conversationId || this.envoiEnCours) {
      return;
    }

    this.envoiEnCours = true;
    this.boutiqueService.envoyerMessage(conversationId, contenu).subscribe({
      next: (message) => {
        this.messages = [...this.messages, message];
        this.nouveauMessage = '';
        this.envoiEnCours = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        this.erreur = error?.error?.detail || 'Le message n’a pas pu être envoyé.';
        this.envoiEnCours = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
