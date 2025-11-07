import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { getCurrentUser } from '../state/user.signal';

export const canActivateAdmin: CanActivateFn = () => {
  const user = getCurrentUser();
  const router = inject(Router);

  if (user?.rol === 'admin') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const canActivateEstudiante: CanActivateFn = () => {
  const user = getCurrentUser();
  const router = inject(Router);

  if (user?.rol === 'estudiante') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};