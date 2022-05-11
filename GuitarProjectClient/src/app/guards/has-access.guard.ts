import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class HasAccessGuard implements CanActivate {
  constructor(
    private data: DataService,
    private r: Router,
    private cart: CartService

  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.token
    if (token) {
      const { user }: any = jwtDecode(localStorage?.token)
      if (user[0].has_access) {
        this.cart.getItemsInCart(user[0]?._id)
        return true;

      }
    }
    this.r.navigateByUrl('/login')
  }

}
