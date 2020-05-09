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
buttons: any [] = [];





  constructor(private userservice: UserService,
  private storageservice : StorageService) {
  }

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

   
   let category = shoes.category.toLowerCase(); 

    
    // Save or Update Shoes In LocalStorage 
     
    const r = this.storageservice.saveOrUpdateShoeInLocal(shoes, i, this.category);
 
  
    let disStatus = r;
    var element = <HTMLInputElement> document.getElementById(i);
        element.disabled = disStatus;
        if(r) {
        return;
        }
    

        
    // Update basket value and set this value to LocalStorage as well as
    // the total price

    this.storageservice.updateBasketAndTotalPrice(shoes);
   
    }

    check(i: any) {
    return  this.buttons.includes(i);
    }




}















