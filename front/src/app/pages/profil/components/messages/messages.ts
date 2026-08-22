import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BoutiqueService, Conversation } from '../../../../core/services/boutique';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages implements OnInit {
  conversations: Conversation[] = [];
  conversationsFiltrees: Conversation[] = [];
  conversationActive: Conversation | null = null;
  messages: any[] = [];
  nouveauMessage = '';
  chargement = true;
  envoiEnCours = false;
  erreur = '';
  recherche = '';
  filtre = 'toutes';

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
        this.appliquerFiltres();
        this.chargement = false;
        if (this.conversationsFiltrees.length > 0) {
          this.selectionner(this.conversationsFiltrees[0]);
        }
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        this.chargement = false;
        this.erreur = error?.error?.detail || 'Impossible de charger vos conversations.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  appliquerFiltres(): void {
    const recherche = this.recherche.trim().toLowerCase();
    this.conversationsFiltrees = this.conversations.filter((conversation) => {
      const texte = `${conversation.boutique_nom || ''} ${conversation.dernier_message?.contenu || ''}`.toLowerCase();
      const rechercheOK = !recherche || texte.includes(recherche);
      const filtreOK = this.filtre === 'toutes' || !!conversation.dernier_message;
      return rechercheOK && filtreOK;
    });

    if (this.conversationActive && !this.conversationsFiltrees.some(c => c.id === this.conversationActive?.id)) {
      this.conversationActive = null;
      this.messages = [];
    }
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
        this.erreur = 'Impossible de charger les messages.';
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
