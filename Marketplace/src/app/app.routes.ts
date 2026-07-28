import { Routes } from '@angular/router';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { DashboardVendeur } from './dashboard-vendeur/dashboard-vendeur';
import { Boutique } from './boutique/boutique';
import { Login } from './login/connexion';
import { Register } from './register/register';
import { Accueil } from './accueil/accueil';
import { ProduitsComponent } from './produits/produits';
import { Offres } from './offres/offres';
import { MesCommandes } from './mes-commandes/mes-commandes';
import { PanierComponent } from './panier/panier';
import { ProduitDetailComponent } from './produit-detail/produit-detail';
import { PaimentComponent } from './paiment/paiment';
import { Profil } from './profil/profil';
import { FavoritesComponent } from './favoris/favoris';
import { NotificationsComponent } from './notifications/notifications';
import { ConfirmationComponent } from './confirmation/confirmation';
import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'accueil', component: Accueil },
  { path: 'produits', component: ProduitsComponent },
  { path: 'produit/:id', component: ProduitDetailComponent },
  { path: 'panier', component: PanierComponent, canActivate: [AuthGuard] },
  { path: 'offres', component: Offres },
  { path: 'admin', component: DashboardAdmin, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'vendeur', component: DashboardVendeur, canActivate: [RoleGuard], data: { roles: ['VENDOR'] } },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'boutique/:id', component: Boutique },
  { path: 'boutique', component: Boutique },
  { path: 'mes-commandes', component: MesCommandes, canActivate: [AuthGuard] },
  { path: 'paiment', component: PaimentComponent, canActivate: [AuthGuard] },
  { path: 'confirmation', component: ConfirmationComponent, canActivate: [AuthGuard] },
  { path: 'favoris', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: Profil, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
];