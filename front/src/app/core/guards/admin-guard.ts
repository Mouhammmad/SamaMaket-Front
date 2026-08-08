import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  // Vérifie que l'utilisateur est connecté
  if (!auth.estConnecte()) {

    router.navigate(['/login']);
    return false;

  }

  // Vérifie que c'est un administrateur
  if (auth.isAdmin()) {

    return true;

  }

  // Sinon, accès refusé
  router.navigate(['/']);

  return false;

};