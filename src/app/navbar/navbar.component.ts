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
   username : Observable<String>;
   photo : Observable<String>;
   url = 'http://localhost:3000/uploads/';

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

     
        const name = localStorage.getItem('name');
        if(name === null) {
        this.userservice.username.next('');
        } else {
        this.userservice.username.next(name);
        }

        const photo = localStorage.getItem('photo');
        if(photo === null) {
        this.userservice.userphoto.next('');
        } else {
        this.userservice.userphoto.next(photo);
        }
     
         
   }

  

  ngOnInit(): void {
   this.isLoggedIn = this.userservice.login();
   this.basket = this.userservice.basketCount;
  
    
  this.username = this.userservice.username;
  this.photo = this.userservice.userphoto;
   
  }

  onLogout() {
    this.userservice.onLogout();
    this.userservice.username.next('');

  }

}
