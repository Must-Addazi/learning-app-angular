import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  let authorize = false;
  let AuthorizedRoles: string[] = route.data['roles'];  
  let roles: string[] = authService.Role; 
  for (let role of roles) {
    if (AuthorizedRoles.includes(role)) { 
      authorize = true;
      break;  
    }
  }
  if (authorize) {
    return true;  
  } else {
    return false;
  }
};