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
    
    this.userservice.createUser(name, email, password, passwordConfirm).subscribe((res:any) => {
    console.log(res);
    const token = res.token;
    const expires = res.expiresIn;
    const name = res.name;
  
    if(token) {  
     this.userservice.autoAuthUser(expires, name);  
    }
   
      
      

    });

  }

 

}
