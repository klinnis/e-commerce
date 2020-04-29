import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';
import { Observable, Subject, of } from "rxjs";
import {debounceTime, delay, distinctUntilChanged, flatMap, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   name: string;
   
   test: any;
   test2: any;

   selectedFile: File = null;
    fd = new FormData();
    imageStatus: any;
    filenames: string [] = [];

  public keyUp = new Subject<string>();

  constructor(private userservice: UserService, 
  private router: Router, private http: HttpClient) {

     const subscription = this.keyUp.pipe(
     map((event:any) => (<HTMLInputElement>event.target).value),
     debounceTime(1000),
     distinctUntilChanged(),
     flatMap(search => of (search).pipe(delay(500)))
     ).subscribe(res => {this.userservice.checkEmail(res).subscribe(res2 => this.test = res2)});

   }

  ngOnInit(): void {
  }


onFileSelected(event) {
   this.selectedFile = <File>event.target.files[0];
   this.fd.append('file', this.selectedFile, this.selectedFile.name);
   this.filenames.push(this.selectedFile.name);
   this.http.post('http://localhost:3000/api/v1/admin/save-images', this.fd)
   .subscribe(res => this.imageStatus = res);
   this.fd = new FormData();

  }


  onRegister(form: NgForm) {

    const name = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const passwordConfirm = form.value.passwordConfirm;
    let photo = '';
    if(this.selectedFile === null){
     photo = 'default.png';
    } else {
       photo = this.selectedFile.name;
    }
    
    
    
    this.userservice.createUser(name, email, password, passwordConfirm, photo).subscribe((result:any) => {
    const token = result.token;

   
  
    if(token) {  
             localStorage.setItem('logged', 'true');
             localStorage.setItem('name', result.user.name);
             this.userservice.username.next(result.user.name);
             this.userservice.userphoto.next(result.user.photo);
             localStorage.setItem('photo', result.user.photo);
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
