import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import MessageInterface from '../interfaces/message.interface';
import LastActionInterface from '../interfaces/last-action.interface';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, public data: DataService) {}
  public cartErrorMessage: MessageInterface;
  public getItemsInCart(id) {
    this.http
      .get(`${environment.apiUrl}/cart/products/${id}`, {
        headers: {
          'xx-auth': localStorage?.token,
        },
      })
      .subscribe(
        (res: any) => {
          this.data.productsInCart = res.products;
          this.data.totalPrice = res.totalPrice;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public addItemToCart(productId, amount) {
    return this.http.post(
      `${environment.apiUrl}/cart/add/${this.data.user._id}/${productId}`,
      {
        amount,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'xx-auth': this.data.token,
        },
      }
    );
  }

  public deleteItemFromCart(productId) {
    this.http
      .delete(
        `${environment.apiUrl}/cart/delete/${this.data.user._id}/${productId}`,
        { headers: { 'xx-auth': this.data.token } }
      )
      .subscribe(
        (res: any) => {
          this.data.totalPrice = res.totalPrice;
          this.data.productsInCart = res.cart;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public deleteAllItemsFromCart() {
    this.http
      .delete(
        `${environment.apiUrl}/cart/delete-all/${this.data.cartData._id}`,
        { headers: { 'xx-auth': this.data.token } }
      )
      .subscribe(
        (res: any) => {
          this.data.productsInCart = res.cart;
          this.data.totalPrice = res.totalPrice;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public createNewCart(userId) {
    this.http
      .post(
        `${environment.apiUrl}/cart/newcart/${userId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'xx-auth': this.data.token,
          },
        }
      )
      .subscribe(
        (res: any) => {
          this.data.cartData = res.cart;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public getExistingCart(userId) {
    this.http
      .post(
        `${environment.apiUrl}/cart/existing-cart/${userId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'xx-auth': this.data.token,
          },
        }
      )
      .subscribe(
        (res: any) => {
          this.data.cartData = res.cart;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public getLatestUserActionData(userId) {
    this.http
      .get(`${environment.apiUrl}/order/latest-action/${userId}`, {
        headers: {
          'xx-auth': this.data.token,
        },
      })
      .subscribe(
        (res) => {
          this.data.lastUserAction = res as LastActionInterface;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
