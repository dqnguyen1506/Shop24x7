import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path:'products/:product_id', component: ProductComponent},
  {path:'categories/:category_id', component:CategoryComponent},
  {path:'login', component:LoginPageComponent},
  {path:'register', component:RegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
