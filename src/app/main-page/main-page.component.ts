import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

 

  constructor(private userservice: UserService) { 
  }

  ngOnInit(): void {

   this.userservice.getMenShoes();
 
  }

}
