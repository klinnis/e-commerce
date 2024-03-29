import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {StorageService} from '../services/storage.service';
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   isLoggedIn : Observable<boolean>;
   role : Observable<String>;
   name = '';
   basket: Observable<Number>;
   checkCount: string;
   username : Observable<String>;
   photo : Observable<String>;
   url = 'http://localhost:3000/uploads/';

  constructor(private userservice: UserService, private storageservice: StorageService) {
      const status = localStorage.getItem('logged');
      const role = localStorage.getItem('role');
      if(status) {
      this.userservice.logged.next(true);
      this.userservice.role.next(role);
      }
      
      this.isLoggedIn = this.userservice.login();
      this.role = this.userservice.role;
      
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
   this.role = this.userservice.role;
    
  this.username = this.userservice.username;
  this.photo = this.userservice.userphoto;
   
  }

  onLogout() {
    this.userservice.onLogout();
    this.userservice.username.next('');
    this.userservice.role.next('user');
    this.storageservice.temp = [];
    this.storageservice.buttons = [];

  }

}
