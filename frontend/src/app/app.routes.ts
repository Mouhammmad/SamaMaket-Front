import { Routes } from '@angular/router';

import { PublicLayout } from './layouts/public-layout/public-layout';

import { Accueil } from './pages/accueil/accueil';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ListeProduits } from './pages/liste-produits/liste-produits';
import { DetailProduits } from './pages/detail-produits/detail-produits';
import { Profil } from './pages/profil/profil';
import { Verification } from './pages/verification/verification';
import { Graphs } from './pages/graphs/graphs';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Accueil },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'produits', component: ListeProduits },
      { path: 'produit/:id', component: DetailProduits },
      { path: 'profil', component: Profil },
      { path: 'verification', component: Verification },
      { path: 'graphs', component: Graphs },
    ]
  },

  { path: '**', redirectTo: '' }
];