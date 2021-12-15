import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component'
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProductsDetailsComponent } from './components/products/products-details/products-details.component';
import { ProductsComponent } from './components/products/products/products.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes = [
  {path: '', component: HomepageComponent },
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
