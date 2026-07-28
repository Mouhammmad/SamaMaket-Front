import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data?.['roles'] as Array<string> | undefined;
    const userRole = this.authService.getCurrentUserRole();

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!expectedRoles || expectedRoles.length === 0) {
      return true;
    }

    if (expectedRoles.includes(userRole || '')) {
      return true;
    }

    const fallback = userRole === 'VENDOR' ? '/vendeur' : userRole === 'ADMIN' ? '/admin' : '/';
    this.router.navigate([fallback]);
    return false;
  }
}
