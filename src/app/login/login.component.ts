import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

err = '';
minLenght = 8;

  constructor(private userservice: UserService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    this.userservice.loginUser(email, password).subscribe(
      data => console.log(data),
      err => {if(err.statusText === 'Unauthorized'){this.err = 'Wrong Email or Password'} else {this.err = ''}}
    );
  }

}
