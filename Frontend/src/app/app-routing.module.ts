import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { FooterComponent } from './components/footer/footer.component'
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsDetailsComponent } from './components/products/products-details/products-details.component';
import { ProductsComponent } from './components/products/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component: HomepageComponent },
  {path: 'home', component: HomepageComponent},
  {path: 'login', component: LoginPageComponent,
    canActivate: [AuthGuard],
  },
  {path: 'register', component: RegisterPageComponent},
  {path: 'products', children:[
    {path: '', component: ProductsComponent},
    {path: ':product_id', component: ProductComponent}
  ]},
  {path: 'categories/:category_id', component: CategoryComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
