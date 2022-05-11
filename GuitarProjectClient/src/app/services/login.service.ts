import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import MessageInterface from 'src/app/interfaces/message.interface';
import UserInterface from 'src/app/interfaces/user.interface';
import LoginInterface from '../interfaces/login.interface';
import { CartService } from './cart.service';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private data: DataService,
    private http: HttpClient,
    private cart: CartService,
    private r: Router
  ) {}

  login(body: LoginInterface) {
    this.http
      .post(`${environment.apiUrl}/login`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe(
        (res: any) => {
          this.data.errorMessage = undefined;
          localStorage.setItem('token', res.token);
          this.data.user = res.user[0] as UserInterface;
          this.data.token = res.token;
          this.cart.getExistingCart(this.data.user._id);

          this.cart.getLatestUserActionData(this.data.user._id);
        },
        (err: any) => {
          this.data.errorMessage = err.error as MessageInterface;
        }
      );
  }

  logout() {
    this.handleAccess();
    localStorage.clear();
    for (const data in this.data) {
      if (this.data.hasOwnProperty.call(this.data, data)) {
        this.data[data] = undefined;
      }
    }
    this.getTotalActions();
    this.r.navigateByUrl('/login');
  }

  // public get
  public getTotalActions() {
    this.http.get(`${environment.apiUrl}/login/store-data`).subscribe(
      (res: any) => {
        this.data.totalOrders = res.orders;
        this.data.totalProducts = res.guitars;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public handleAccess() {
    this.http
      .post(
        `${environment.apiUrl}/login/handle-access/${this.data.user._id}`,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public getUserOnRefresh(token: string) {
    this.http.get(`${environment.apiUrl}/login/refresh/${token}`).subscribe(
      (res: any) => {
        this.data.user = res.data.user[0];
        this.cart.getLatestUserActionData(this.data.user._id);
        this.cart.getExistingCart(this.data.user._id);
        this.cart.getItemsInCart(this.data.user._id);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
