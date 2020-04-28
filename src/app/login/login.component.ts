import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

err = '';
minLenght = 8;

  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    this.userservice.loginUser(email, password).subscribe((result: any) => {
    
    
           const token = result.token;

           
           if(token) {
             localStorage.setItem('logged', 'true');
             localStorage.setItem('name', result.user.name);
             this.userservice.userphoto.next(result.user.photo);
             this.userservice.logged.next(true);
             this.userservice.username.next(result.user.name);
             this.userservice.authenticated.next(true);
             this.userservice.userphoto.next(result.user.photo);
             localStorage.setItem('photo', result.user.photo);
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
