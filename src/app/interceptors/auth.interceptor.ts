import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken : string = inject(AuthService).getToken();

  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + authToken)
  });
  const authReq1 = authReq.clone({
    headers: authReq.headers.set('Accept', 'application/json')
  });

  return next(authReq1);
};
