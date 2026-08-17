import { Routes } from '@angular/router';
import { ClientLayout } from './layout/client-layout/client-layout';


import { Produits as AdminProduits } from './admin/produits/produits';



import { PublicLayout } from './layout/public-layout/public-layout';
import { Panier } from './pages/panier/panier';
import { Accueil } from './pages/accueil/accueil';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Produits } from './pages/produits/produits';
import { VendeursPage } from './pages/vendeurs/vendeurs';
import { OffresPage } from './pages/offres/offres';
import { Detail as ProduitDetail } from './pages/produits/detail/detail';
import { Livraison } from './pages/livraison/livraison';
import { Paiement } from './pages/paiement/paiement';
import { Confirmation } from './pages/confirmation/confirmation';
import { UtilisateurDetail } from './admin/utilisateur-detail/utilisateur-detail';
import { VendeurLayout } from './layout/vendeur-layout/vendeur-layout';
import { VendeurDetail } from './admin/vendeurs/components/vendeur-detail/vendeur-detail';
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
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { Dashboard as DashboardAdmin } from './admin/dashboard/dashboard';
import { Utilisateurs } from './admin/utilisateurs/utilisateurs';
import { Vendeurs } from './admin/vendeurs/vendeurs';
import { adminGuard } from './core/guards/admin-guard';
import { AdminLogin } from './pages/admin-login/admin-login';
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
        path: 'vendeurs',
        component: VendeursPage
      },

      {
        path: 'offres',
        component: OffresPage
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
        component: Livraison
      },

      {
        path: 'paiement',
        component: Paiement
      },

      {
        path: 'confirmation/:id',
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
    path: 'admin/login',
    component: AdminLogin
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [adminGuard],
    children: [
      {
      path: '',
      redirectTo: 'produits',
      pathMatch: 'full'
    },

    {
      path: 'produits',
      component: AdminProduits
    },


    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },

    {
      path: 'dashboard',
      component: DashboardAdmin
    },

    {
      path: 'utilisateurs',
      component: Utilisateurs
    },

    {
      path: 'utilisateurs/:id',
      component: UtilisateurDetail
    },

    {
      path: 'vendeurs',
      component: Vendeurs
    },

    {
      path: 'vendeurs/:id',
      component: VendeurDetail
    }

  ]
}

];