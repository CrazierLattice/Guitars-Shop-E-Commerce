import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  constructor(
    public cart: CartService,
    public data: DataService,
    public admin: AdminService,
    private snackBar: MatSnackBar
  ) {}
  public addItemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    picture: new FormControl('', [Validators.required]),
  });

  public addNewProduct(value, formDirective: FormGroupDirective) {
    if (formDirective.valid) {
      this.admin.addProduct(value);
      formDirective.resetForm();
      this.addItemForm.reset();
      this.addItemForm.markAsUntouched();
      this.snackBar.open('Product added successfully', 'X', {
        duration: 2000,
      });
    }
  }

  @Input() public drawer: any;
  ngOnInit(): void {}
}
