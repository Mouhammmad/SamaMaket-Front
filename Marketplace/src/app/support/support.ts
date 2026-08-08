import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Faq {
  question: string;
  reponse: string;
  ouvert: boolean;
}

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.html',
  styleUrls: ['./support.scss']
})
export class SupportComponent {

  contact = {
    prenom: '',
    nom: '',
    email: '',
    sujet: '',
    numeroCommande: '',
    message: ''
  };

  faq: Faq[] = [

    {
      question: 'Comment passer une commande sur SAMA MARKET ?',
      reponse: 'Parcourez le catalogue, ajoutez les produits au panier puis cliquez sur Commander. Choisissez votre adresse de livraison et votre moyen de paiement.',
      ouvert: true
    },

    {
      question: 'Quels moyens de paiement sont acceptés ?',
      reponse: 'Nous acceptons Wave, Orange Money, Free Money, cartes bancaires et paiement à la livraison selon votre zone.',
      ouvert: false
    },

    {
      question: 'Comment suivre ma commande ?',
      reponse: 'Depuis votre espace client, ouvrez Mes commandes puis cliquez sur Voir les détails.',
      ouvert: false
    },

    {
      question: 'Comment devenir vendeur sur SAMA MARKET ?',
      reponse: 'Créez un compte vendeur puis soumettez vos informations pour validation.',
      ouvert: false
    },

    {
      question: 'Quelle est la politique de retour ?',
      reponse: 'Vous pouvez demander un retour selon les conditions indiquées sur la fiche produit.',
      ouvert: false
    }

  ];

  envoyerMessage() {

    if (
      !this.contact.prenom ||
      !this.contact.nom ||
      !this.contact.email ||
      !this.contact.sujet ||
      !this.contact.message
    ) {

      alert('Veuillez remplir tous les champs obligatoires.');

      return;

    }

    console.log(this.contact);

    alert('Votre message a été envoyé avec succès.');

    this.contact = {
      prenom: '',
      nom: '',
      email: '',
      sujet: '',
      numeroCommande: '',
      message: ''
    };

  }

  toggleFaq(item: Faq) {

    item.ouvert = !item.ouvert;

  }

}