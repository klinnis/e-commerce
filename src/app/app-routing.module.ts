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
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';




const routes: Routes = [
{ path: '', component: RegisterComponent },
{ path: 'signup', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{ path: 'main-page', component: MainPageComponent },
{ path: 'men-shoes', component: MenComponent },
{ path: 'women-shoes', component: WomenComponent },
{ path: 'kids-shoes', component: KidsComponent },
{ path: 'create-shoe', component: CreateShoeComponent, canActivate: [AdminGuard] },
{ path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
{ path: 'admin-orders', component: AdminOrdersComponent, canActivate: [AdminGuard] },
{ path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
