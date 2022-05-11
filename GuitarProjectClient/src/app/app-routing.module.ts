import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstRegisterComponent } from './components/first-register/first-register.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { OrderComponent } from './components/order/order.component';
import { SecondRegisterComponent } from './components/second-register/second-register.component';
import { ActiveCartGuard } from './guards/active-cart.guard';
import { FirstRegistryValidationGuard } from './guards/first-registry-validation.guard';
import { HasAccessGuard } from './guards/has-access.guard';
import { LoggedinGuard } from './guards/loggedin.guard';
import { LoggedoutGuard } from './guards/loggedout.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedoutGuard] },
  {
    path: 'first-register',
    component: FirstRegisterComponent,
    canActivate: [LoggedoutGuard],
  },
  {
    path: 'second-register',
    component: SecondRegisterComponent,
    canActivate: [FirstRegistryValidationGuard],
  },
  { path: 'main', component: MainComponent, canActivate: [HasAccessGuard] },
  { path: 'order', component: OrderComponent, canActivate: [ActiveCartGuard] },
  { path: '**', redirectTo: 'main', canActivate: [LoggedinGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
