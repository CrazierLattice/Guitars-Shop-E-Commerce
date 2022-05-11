import { Component, Input, OnInit } from '@angular/core';
import CartInterface from 'src/app/interfaces/cart.interface';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  constructor(public cart: CartService, private data: DataService) { }
  @Input() public product: CartInterface;
  public deleteItemFromCart() {
    this.cart.deleteItemFromCart(this.product.guitar._id);
  }

  ngOnInit(): void { }
}
