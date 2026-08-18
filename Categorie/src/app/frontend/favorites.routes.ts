import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { FavoritesPageComponent } from './favorites-page.component';

// À fusionner dans le tableau de routes principal de l'application
export const favoritesRoutes: Routes = [
  {
    path: 'favorites',
    component: FavoritesPageComponent,
    canActivate: [AuthGuard],
  },
];
