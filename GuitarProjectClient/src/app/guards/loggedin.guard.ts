import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoggedinGuard implements CanActivate {
  constructor(private r: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      const decoded: any = jwt_decode(token);
      if (decoded.exp > Date.now() / 1000) {
        return true;
      } else {
        this.r.navigateByUrl('/login');
        return false;
      }
    } else {
      this.r.navigateByUrl('/login');
      return false;
    }
  }
}
