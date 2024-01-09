import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const loginGuard: CanActivateFn = () => {
  const loginSrv = inject(LoginService);

  if (loginSrv.isLoggedIn()) {
    return true;
  } else {
    return false;
  }
};
