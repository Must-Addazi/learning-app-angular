import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { catchError, throwError } from 'rxjs';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
 const authService= inject(AuthenticationService)
 if(!req.url.includes('/auth/login') && !req.url.includes('/program') && !req.url.includes('/modules') && !req.url.includes('/saveStudent') && !req.url.includes("/posterFile")){
  console.log("non login "+req)
  let newrequest=req.clone({
   headers: req.headers.set('Authorization','Bearer '+authService.accesToken)
  })
  return next(newrequest).pipe(
    catchError(err => {
      if (err.status === 401) {
        authService.logout();
      }
      return throwError(() => err);
    })
  )
 }else{
  return next(req);
 }
};
