import { Routes } from '@angular/router';
import { ClientLayout } from './layout/client-layout/client-layout';

import { PublicLayout } from './layout/public-layout/public-layout';
import { Panier } from './pages/panier/panier';
import { Accueil } from './pages/accueil/accueil';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Produits } from './pages/produits/produits';
import { ProduitDetail } from './pages/produit-detail/produit-detail';
import { Checkout } from './pages/checkout/checkout';
import { Paiement } from './pages/paiement/paiement';
import { Confirmation } from './pages/confirmation/confirmation';

import { VendeurLayout } from './layout/vendeur-layout/vendeur-layout';

import { Dashboard } from './vendeur/dashboard/dashboard';
import { Produits as ProduitsVendeur } from './vendeur/produits/produits';
import { Commandes } from './vendeur/commandes/commandes';
import { Statistiques } from './vendeur/statistiques/statistiques';
import { Boutiques } from './vendeur/boutiques/boutiques';
import { Livraisons } from './vendeur/livraisons/livraisons';
import { Avis } from './vendeur/avis/avis';
import { Paiement as PaiementVendeur } from './vendeur/paiement/paiement';
import { Parametre } from './vendeur/parametre/parametre';
import { vendeurGuard } from './core/guards/vendeur-guard';
import { authGuard } from './core/guards/auth-guard';
import { Promotions } from './vendeur/promotions/promotions';
export const routes: Routes = [

  {
    path: '',
    component: PublicLayout,
    children: [

      {
        path: '',
        component: Accueil
      },

      {
        path: 'produits',
        component: Produits
      },

      {
        path: 'produit/:id',
        component: ProduitDetail
      },

      {
        path: 'panier',
        component: Panier
      },

      {
        path: 'checkout',
        component: Checkout
      },

      {
        path: 'paiement',
        component: Paiement
      },

      {
        path: 'confirmation',
        component: Confirmation
      }

    ]
  },

  {
      path: 'client',
    component: ClientLayout,
    canActivate: [authGuard]
  },

  {
  path: 'vendeur',
  component: VendeurLayout,
  canActivate: [vendeurGuard],
  children: [

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },

    {
      path: 'dashboard',
      component: Dashboard
    },

    {
      path: 'commandes',
      component: Commandes
    },

    {
      path: 'produits',
      component: ProduitsVendeur
    },

    {
      path: 'statistiques',
      component: Statistiques
    },
    {
      path: 'promotions',
      component: Promotions
    },

    {
      path: 'boutiques',
      component: Boutiques
    },

    {
      path: 'boutique',
      redirectTo: 'boutiques',
      pathMatch: 'full'
    },

    {
      path: 'livraisons',
      component: Livraisons
    },

    {
      path: 'avis',
      component: Avis
    },

    {
      path: 'paiements',
      component: PaiementVendeur
    },

    {
      path: 'parametre',
      component: Parametre
    }

  ]
},

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: '**',
    redirectTo: ''
  }

];