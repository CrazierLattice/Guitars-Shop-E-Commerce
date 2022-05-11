import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import GuitarInterface from 'src/app/interfaces/guitar.interface';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import MessageInterface from 'src/app/interfaces/message.interface';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  constructor(
    public cart: CartService,
    public data: DataService,
    public dialog: MatDialog,
    public admin: AdminService,
    private fb: FormBuilder
  ) { }
  @Input() public guitar: GuitarInterface;
  @ViewChild('addToCartDialog') addToCartDialog: TemplateRef<any>;
  @ViewChild('editProductDialog') editProductDialog: TemplateRef<any>;
  @Input() public drawer;
  public cartErrorMessage: MessageInterface;

  public editProductForm: FormGroup;
  openPurchaseDialog() {
    this.cartErrorMessage = null;
    if (!this.data.cartData) {
      this.cart.createNewCart(this.data.user._id)
    }
    this.dialog.open(this.addToCartDialog);
  }

  openEditDialog() {
    this.data.editProductError = null;
    this.dialog.open(this.editProductDialog);
  }

  public addToCart(id: string, amount: number) {
    this.cart.addItemToCart(id, amount).subscribe(
      (res: any) => {
        this.data.productsInCart = res.cartDetails;
        this.data.totalPrice = res.totalPrice;
        this.dialog.closeAll();
        this.drawer.open();
      },
      (err) => {
        this.cartErrorMessage = err.error;
      }
    );
  }
  ngOnInit(): void {
    this.editProductForm = this.fb.group({
      name: this.guitar.name,
      category: this.guitar.category._id,
      price: this.guitar.price,
      picture: this.guitar.picture,
    });
  }
}
