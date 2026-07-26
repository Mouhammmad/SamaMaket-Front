import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login.component';
import { PanierComponent } from './modules/panier/panier.component';
import { PaiementComponent } from './modules/paiement/paiement.component';
import { ProfilComponent } from './modules/profil/profil.component';
import { FavorisComponent } from './modules/favoris/favoris.component';
import { LivraisonComponent } from './modules/livraison/livraison.component';
import { AvisComponent } from './modules/avis/avis.component';
import { CatalogueComponent } from './modules/catalogue/catalogue.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'catalogue', component: CatalogueComponent, canActivate: [authGuard] },
  { path: 'panier', component: PanierComponent, canActivate: [authGuard] },
  { path: 'paiement', component: PaiementComponent, canActivate: [authGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [authGuard] },
  { path: 'favoris', component: FavorisComponent, canActivate: [authGuard] },
  { path: 'livraison', component: LivraisonComponent, canActivate: [authGuard] },
  { path: 'avis', component: AvisComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'catalogue', pathMatch: 'full' }
];