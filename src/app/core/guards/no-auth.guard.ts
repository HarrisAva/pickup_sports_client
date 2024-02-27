import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService)
  const router = inject(Router)

  if(authService.isLoggedIn()){
    router.navigate(['/']) // if user is already login, redirect to root
    return false; // not allow user to go to /login page
  }else{
    return true; // allow user to go to /login page
  }
};
