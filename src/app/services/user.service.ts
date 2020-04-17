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
  //basket : Observable<Number>;
  basketCount = new BehaviorSubject<Number>(0);
  totalPrice = 0;
  

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

    autoAuthUser(expires: any, name: string) {
     this.logged.next(true);
     this.setTimer(expires);
     const now = new Date();
     const expirationDate = new Date(now.getTime() + expires * 1000);
     console.log(expirationDate);
     localStorage.setItem('name', name);
     localStorage.setItem('logged', 'true');
     this.router.navigateByUrl('/main-page');
    }

     setTimer(duration: any) {
       this.tokenTimer = setTimeout(() => {this.onLogout() }, duration * 1000);
    }

    checkEmail(email: any) {
        const authData = {email: email};
        return this.http.post( this.url + '/api/v1/users/checkEmail', authData);
    }

    

   



}
