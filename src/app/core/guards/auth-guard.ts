
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();

  console.log('AuthGuard User:', user);

  if (user) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
