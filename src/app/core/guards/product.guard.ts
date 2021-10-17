import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class ProductGuard implements CanActivate {
  roles!: string;

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedRole = route.data.expectedRole;
    this.roles = this.tokenService.isAdmin() ? 'admin' : 'user';
    if (
      !this.tokenService.isLoggedIn() ||
      expectedRole.indexOf(this.roles) < 0
    ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
