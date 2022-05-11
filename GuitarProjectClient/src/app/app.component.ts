import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { DataService } from './services/data.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private data: DataService, private login: LoginService) { }
  title = 'GuitarProjectClient';

  ngOnInit(): void {
    this.login.getTotalActions();
    if (localStorage.token)
      return this.login.getUserOnRefresh(localStorage.token);
  }
}
