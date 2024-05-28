import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { OrderComponent } from './components/pages/order/order.component';
import { authGuard } from './utils/auth.guard';
import { FinalizeOrderComponent } from './components/pages/finalize-order/finalize-order.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'order', component: OrderComponent, canActivate: [authGuard]},
  { path: 'finalize-order', component: FinalizeOrderComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
