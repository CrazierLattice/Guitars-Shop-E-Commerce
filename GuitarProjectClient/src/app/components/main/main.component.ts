import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    public data: DataService,
    public cart: CartService,
    public main: MainService,
    public login: LoginService,
    public admin: AdminService
  ) { }
  public getProductsForCategory(id) {
    this.main.getGuitarsByCategory(id);
  }

  public handleSearch(inputValue) {
    this.main.getGuitarsBySearch(inputValue);
  }
  ngOnInit(): void {
    this.main.getCategories();
    this.main.getAllGuitars();

  }
}
