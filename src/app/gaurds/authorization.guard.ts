import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  let authorize = false;
  let AuthorizedRoles: string[] = route.data['roles'];  
  let roles: string[] = authService.Role.split(' ');
  console.log(roles)
  for (let role of roles) {
    if (AuthorizedRoles.includes(role)) { 
      authorize = true;
      break;  
    }
  }
  if (authorize) {
    console.log("authorized")
    return true;  
  } else {
    console.log("not authorized")
    return false;
  }
};