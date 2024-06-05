import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateChildFn = async (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  try {
    const response = await lastValueFrom(authService.getUserProfile());
    if (response.data.isAdmin) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  } catch (error) {
    console.log(error);
    router.navigate(['/']);
    return false;
  }
};
