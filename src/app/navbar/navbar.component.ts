import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   isLoggedIn : Observable<boolean>;
   name = '';
   basket: Observable<Number>;
   checkCount: string;
   

  constructor(private userservice: UserService) {
      const status = localStorage.getItem('logged');
      if(status) {
      this.userservice.logged.next(true);
      }
      
      this.isLoggedIn = this.userservice.login();
      
      const count = parseInt(localStorage.getItem('count'));
      if(count === null || Number.isNaN(count)) {
        this.basket = this.userservice.basketCount;
      } else {
           this.userservice.basketCount.next(count);
      }
      
   }

  

  ngOnInit(): void {
   this.isLoggedIn = this.userservice.login();
   this.basket = this.userservice.basketCount;
   
  }

  onLogout() {
    this.userservice.onLogout();
  }

}
