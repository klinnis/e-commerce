import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Router} from '@angular/router';
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  logged = new BehaviorSubject(false);
  url = 'http://localhost:3000';
  tokenTimer: any;
  authenticated = new BehaviorSubject<Boolean>(false);
  basketCount = new BehaviorSubject<Number>(0);
  totalPrice = new BehaviorSubject<String>('0');
  roletype = new BehaviorSubject<String>('user');
  token: any;
  username = new BehaviorSubject<String>('');
  

  constructor(private http:  HttpClient, private router: Router) { }



      createUser(name: string, email: string, password: string, passwordConfirm: string ) {
      const authData = {name: name, email: email, password: password, passwordConfirm: passwordConfirm};
      return this.http.post( this.url + '/api/v1/users/signup', authData);
    }

    getMenShoes() {

    return this.http.get( this.url + '/api/v1/users/men-shoes');
    
    }


    loginUser(email: string, password: string) {
      const authData = {email: email, password: password};
      return this.http.post( this.url + '/api/v1/users/login', authData);
    }

     onLogout() {

        this.logged.next(false);
        clearTimeout(this.tokenTimer);
        localStorage.clear();
        this.router.navigate(['/signup']);
        this.basketCount.next(0);
    }

    login() {
    return this.logged;
    }

    

     setTimer(duration: any) {
       this.tokenTimer = setTimeout(() => {this.onLogout() }, duration * 1000);
    }

    autoAuthUser1() {
      const authinfo = this.getuserData();
      if (!authinfo) {
          return;
      }
      const now = new Date();
      const expiresIn = authinfo.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
          this.token = authinfo.token;
          this.authenticated.next(true);
      }
      }

      getuserData() {
       const token = localStorage.getItem('token');
       const expiration =  localStorage.getItem('expiration');
       const role = localStorage.getItem('role');
       if (!token || !expiration) {
           return;
       }
       return {
           token: token,
           expirationDate: new Date(expiration),
           role: role
       };
    }

    checkEmail(email: any) {
        const authData = {email: email};
        return this.http.post( this.url + '/api/v1/users/checkEmail', authData);
    }



    order(order: any[]) {
    
        return this.http.post( this.url + '/api/v1/users/order', order);
    }

     saveuserData(token: string, expiration: Date, role: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiration.toString());
        localStorage.setItem('role', role);
    }

    
  
   



}
