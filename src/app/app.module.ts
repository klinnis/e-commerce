import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MainPageComponent } from './main-page/main-page.component';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { KidsComponent } from './kids/kids.component';
import { CreateShoeComponent } from './create-shoe/create-shoe.component';
import {MatIconModule} from '@angular/material/icon';
import { CartComponent } from './cart/cart.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    MenComponent,
    WomenComponent,
    KidsComponent,
    CreateShoeComponent,
    CartComponent,
    AdminOrdersComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    MatBadgeModule,
    FormsModule,
    MatIconModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
     HttpClientModule,
      ReactiveFormsModule,
      MatSelectModule,
      MatDialogModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
