import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendeurAttenteCard } from '../components/vendeur-attente-card/vendeur-attente-card';
import { StatCard } from '../shared/stat-card/stat-card';
import { UtilisateurRow } from '../shared/utilisateur-row/utilisateur-row';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatCard,
     VendeurAttenteCard,
     UtilisateurRow
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  statistiques = [

    {
      titre: 'Utilisateurs total',
      valeur: 1284,
      evolution: '+42 ce mois',
      couleur: '#3b82f6'
    },

    {
      titre: 'Vendeurs actifs',
      valeur: 87,
      evolution: '+8 ce mois',
      couleur: '#9333ea'
    },

    {
      titre: 'Produits publiés',
      valeur: 3420,
      evolution: '+156 ce mois',
      couleur: '#f97316'
    },

    {
      titre: 'Commandes du jour',
      valeur: 248,
      evolution: '+18%',
      couleur: '#22c55e'
    }

  ];
vendeursEnAttente = [

  {
    id: 1,
    nom: 'Dakar Shop',
    email: 'dakarshop@gmail.com'
  },

  {
    id: 2,
    nom: 'Touba Market',
    email: 'toubamarket@gmail.com'
  },

  {
    id: 3,
    nom: 'Kaolack Store',
    email: 'kaolackstore@gmail.com'
  }

];

approuver(id: number) {

  alert('Vendeur ' + id + ' approuvé.');

}

refuser(id: number) {

  alert('Vendeur ' + id + ' refusé.');

}
utilisateursRecents = [

  {
    nom: 'Issa Ami',
    email: 'issa@gmail.com',
    role: 'Client'
  },

  {
    nom: 'Mamadou Fall',
    email: 'mfall@gmail.com',
    role: 'Vendeur'
  },

  {
    nom: 'Awa Ndiaye',
    email: 'awa@gmail.com',
    role: 'Client'
  },

  {
    nom: 'Cheikh Diop',
    email: 'cheikh@gmail.com',
    role: 'Administrateur'
  }

];
}