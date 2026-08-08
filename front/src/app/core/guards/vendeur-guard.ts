import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const vendeurGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.estConnecte()) {
    router.navigate(['/login']);
    return false;
  }

  if (authService.isVendor()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
