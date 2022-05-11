import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';

import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private login: LoginService,
    public cart: CartService,
    public data: DataService,
    private r: Router
  ) { }
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public handleLogin() {
    this.login.login(this.loginForm.value);
  }

  public handleAccess() {
    this.login.handleAccess()
  }

  ngOnInit(): void { }
}
