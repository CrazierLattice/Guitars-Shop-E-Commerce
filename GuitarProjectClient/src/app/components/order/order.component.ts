import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild('products') products
  @ViewChild('orderSuccess') orderSuccess


  public search_values: String = ''
  public mark: boolean

  public markMatchedValues = (e) => {
    this.search_values = e.target.value
  }


  public numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  public closeOrderModal() {
    this.dialog.closeAll()
    this.data.cartData = undefined
    this.data.productsInCart = undefined
    this.r.navigateByUrl('/main')
  }

  public orderForm = new FormGroup(
    {
      delivery_city: new FormControl('', Validators.required),
      delivery_street: new FormControl('', Validators.required),
      delivery_date: new FormControl('', Validators.required),
      credit_card: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(12), Validators.pattern(this.numericNumberReg)])

    }
  )

  public handleDoubleClick() {
    this.orderForm.controls.delivery_city.setValue(this.data?.user?.city)
    this.orderForm.controls.delivery_street.setValue(this.data?.user?.street)
  }



  public orderSubmit() {
    this.data.orderMessage = undefined
    this.order.createNewOrder(this.data.user._id, this.data.cartData._id, this.orderForm.value, this.orderSuccess)

  }

  constructor(public data: DataService, public r: Router, public login: LoginService, public order: OrderService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

}
