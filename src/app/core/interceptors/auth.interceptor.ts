import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthenticationService)

  if(authService.isLoggedIn()){
    const authToken = authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set(`Authorization`,`Bearer ${authToken}` )
    })
    return next(authReq)
  }
  // if user it not login, return regular request
  return next(req);
};

// when user is logged in, get user's token, then clone the request sending to BE, attach the token to the header of Authorization, type of authorization is Bearer
// useful to reduce the redundancy to these requests
