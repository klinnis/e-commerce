import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { KidsComponent } from './kids/kids.component';
import { CreateShoeComponent } from './create-shoe/create-shoe.component';
import { CartComponent } from './cart/cart.component';




const routes: Routes = [
{ path: '', component: RegisterComponent },
{ path: 'signup', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{ path: 'main-page', component: MainPageComponent },
{ path: 'men-shoes', component: MenComponent },
{ path: 'women-shoes', component: WomenComponent },
{ path: 'kids-shoes', component: KidsComponent },
{ path: 'create-shoe', component: CreateShoeComponent },
{ path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
