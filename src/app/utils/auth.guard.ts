import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  return authService.isLoggedIn.pipe(
    map(loggedIn => {
      if (!loggedIn) {
        toastService.showToast('You need to be logged in to make orders','error')
        router.navigate(['/login']);
      }
      return loggedIn;
    })
  );
};