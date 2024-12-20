import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthenticationService)
  const router= inject(Router)
  if(authService.isAuthenticated==true){
    return true;
  }else{
  router.navigateByUrl("/login")
  
  return false;}
};
