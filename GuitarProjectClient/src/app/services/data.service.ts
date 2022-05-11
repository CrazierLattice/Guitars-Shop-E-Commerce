import { Injectable } from '@angular/core';
import CartDataInterface from '../interfaces/cart-data.interface';
import CartInterface from '../interfaces/cart.interface';
import CategoryInterface from '../interfaces/category.interface';
import GuitarInterface from '../interfaces/guitar.interface';
import LastActionInterface from '../interfaces/last-action.interface';
import RegisterInterface from '../interfaces/register.interface';
import UserInterface from '../interfaces/user.interface';
import MessageInterface from '../interfaces/message.interface';
import OrderInterface from '../interfaces/order-data-interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() { }
  public user: UserInterface;
  public registeringUser: RegisterInterface;
  public token: string = localStorage.token;
  public firstStepRegistryValidation: boolean;
  public categories: [CategoryInterface];
  public guitars: [GuitarInterface];
  public productsInCart: [CartInterface];
  public cartData: CartDataInterface;
  public totalPrice: number;
  public totalOrders: number;
  public totalProducts: number;
  public lastUserAction: LastActionInterface;
  public errorMessage: MessageInterface;
  public registryMessage: MessageInterface;
  public editProductError: MessageInterface;
  public addProductMessage: MessageInterface;
  public orderMessage: MessageInterface
  public orderData: OrderInterface
}
