import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate,CanActivateChild , Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FacebookGuard implements CanActivate , CanActivateChild  {
  constructor( public authService: AuthService,
               private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const status = this.authService.isLoggedIn;
    if (status) {
      return true;
    } else {
      alert('Vui lòng xác minh tài khoản');
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
