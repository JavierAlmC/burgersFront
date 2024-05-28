import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { OffcanvasComponent } from './components/commons/offcanvas/offcanvas.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { ApiServiceService } from './services/api-service.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './components/pages/order/order.component';
import { FormsModule } from '@angular/forms';
import { ToastComponentComponent } from './components/commons/toast-component/toast-component.component';
import { OrderOffcanvasComponent } from './components/pages/order/order-offcanvas/order-offcanvas.component';
import { FinalizeOrderComponent } from './components/pages/finalize-order/finalize-order.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    OffcanvasComponent,
    FooterComponent,
    ProductsComponent,
    OrderComponent,
    ToastComponentComponent,
    OrderOffcanvasComponent,
    FinalizeOrderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
