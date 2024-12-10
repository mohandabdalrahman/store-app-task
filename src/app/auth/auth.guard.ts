// auth.guard.ts
import { Injectable, inject } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const urlSegments = state.url.split('/').filter(segment => segment);
    const lastPath = urlSegments[urlSegments.length - 1];
    if (this.authService.getRole() === lastPath) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
