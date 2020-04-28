import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';
import { Observable, Subject, of } from "rxjs";
import {debounceTime, delay, distinctUntilChanged, flatMap, map, tap} from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   name: string;
   
   test: any;
   test2: any;

  public keyUp = new Subject<string>();

  constructor(private userservice: UserService, private router: Router) {

     const subscription = this.keyUp.pipe(
     map((event:any) => (<HTMLInputElement>event.target).value),
     debounceTime(1000),
     distinctUntilChanged(),
     flatMap(search => of (search).pipe(delay(500)))
     ).subscribe(res => {this.userservice.checkEmail(res).subscribe(res2 => this.test = res2)});

   }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {

    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const passwordConfirm = form.value.passwordConfirm;
    
    this.userservice.createUser(name, email, password, passwordConfirm).subscribe((result:any) => {
    const token = result.token;

   
  
    if(token) {  
             localStorage.setItem('logged', 'true');
             localStorage.setItem('name', result.user.name);
             this.userservice.username.next(result.user.name);
             this.userservice.logged.next(true);
             this.userservice.authenticated.next(true);
             const role = result.user.role;
             this.userservice.roletype.next(role);
             const expires = result.expiresIn;
             this.userservice.setTimer(expires);
             const now = new Date();
             const expirationDate = new Date(now.getTime() + expires * 1000);
             this.userservice.saveuserData(token, expirationDate, role);
             this.router.navigateByUrl('/main-page'); 
    }
   
      
      

    });

  }

 

}
