import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from '../services/auth';

export const roleGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();

  const allowedRoles = route.data['roles'] as UserRole[];

  console.log('RoleGuard User:', user);
  console.log('Allowed Roles:', allowedRoles);

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  if (allowedRoles.includes(user.role)) {
    return true;
  }
  if(user.role =='customer'){
    return router.createUrlTree([`/dashboard`]);
  }
  return router.createUrlTree([`/${user.role}/dashboard`]);
};