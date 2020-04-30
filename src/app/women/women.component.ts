import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {

shoes: any;
imagesPath = 'http://localhost:3000/uploads/';
category = 'women';

  constructor(private userservice: UserService,
  private storageservice : StorageService) { }

  ngOnInit(): void {

          this.userservice.getWomenShoes().subscribe(
          data => { this.shoes = data;
                    this.shoes = Array.of(this.shoes);
                    this.shoes = this.shoes[0].shoes;
           },
                    err => console.error(err), 
                    () => console.log('getWomenShoes completed') 
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
