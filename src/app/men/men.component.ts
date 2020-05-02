import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {StorageService} from '../services/storage.service';
import { Observable } from "rxjs";


@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {

shoes: any;
imagesPath = 'http://localhost:3000/uploads/';
category = 'men';





  constructor(private userservice: UserService,
  private storageservice : StorageService) {}

  ngOnInit(): void {

  

   this.userservice.getMenShoes().subscribe(
          data => { this.shoes = data;
                    this.shoes = Array.of(this.shoes);
                    this.shoes = this.shoes[0].shoes;
                    
           },
                    err => console.error(err), 
                    //() => console.log('getMenShoes completed') 
           );
                   }



addToCart(shoes: any, i: any) {

    // Save or Update Shoes In LocalStorage 
     
    
    this.storageservice.saveOrUpdateShoeInLocal(shoes, i, this.category);

    // Update basket value and set this value to LocalStorage as well as
    // the total price

    this.storageservice.updateBasketAndTotalPrice(shoes);
   
    }




}















