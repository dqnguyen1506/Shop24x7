import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UserService } from './services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HomepageService } from './services/homepage/homepage.service';
import { ProductsComponent } from './components/products/products/products.component';
import { ProductsDetailsComponent } from './components/products/products-details/products-details.component';
import { ProductsService } from './services/products/products.service';
import { CategoryComponent } from './components/category/category.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductComponent } from './components/product/product.component';
import { AuthService } from './services/auth/auth.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { FilterPipe } from './filter';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    AddNewProductComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomepageComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    CategoryComponent,
    ProfileComponent,
    ProductComponent,
    ManageProductsComponent,
    ManageOrderComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, HomepageService, ProductsService, AuthService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
