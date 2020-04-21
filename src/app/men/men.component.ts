import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {

shoes: any;
imagesPath = 'http://localhost:3000/uploads/';
quantity = false;
keys: string = '0';
keys1: Number = 0;

keysArray = [];

  constructor(private userservice: UserService) {

   let test =  parseFloat(localStorage.getItem('count'));
   let test1 = test.toString();
   this.keys1 = test;
   this.keys = test1;
   

   }

  ngOnInit(): void {

   let test =  parseFloat(localStorage.getItem('count'));
   let test1 = test.toString();
   this.keys1 = test;
   this.keys = test1;

   this.userservice.getMenShoes().subscribe(
          data => { this.shoes = data;
                  this.shoes = Array.of(this.shoes);
                  this.shoes = this.shoes[0].shoes;
                  console.log(this.shoes[0].quantity);
           },
          err => console.error(err), 
          () => console.log('getMenShoes completed') 
          );
}

addToCart(shoes: any, i: any) {

    // Save Shoes and update Basket  

    const checkShoe = localStorage.getItem('shoe' + i); 
    if(checkShoe === null) {
        shoes.cart_quantity = 1;
        shoes.cart_price = shoes.price;
        localStorage.setItem('shoe'+ i, JSON.stringify(shoes));
    } else {
       let quantInt = parseInt(shoes.cart_quantity);
       quantInt = +quantInt + 1;
       let shoePrice = shoes.price * quantInt;
       let finalShoePrice = shoePrice.toFixed(2);
       shoes.cart_price = finalShoePrice;
       let quantString = quantInt.toString();
       shoes.cart_quantity = quantString;
       localStorage.setItem('shoe'+ i, JSON.stringify(shoes));
    }

     
    let basket_value = this.userservice.basketCount.getValue();
    let new_basket_value = +basket_value + 1;
    this.userservice.basketCount.next(new_basket_value);
    let count_int_value = this.userservice.basketCount.getValue();
    let string_count = count_int_value.toString();
    localStorage.setItem('count', string_count);

    let total = localStorage.getItem('total');
     if(total === null) {
         let shoePrice = shoes.price;
         localStorage.setItem('total', shoePrice);

    } else {
         
         total = +total + shoes.price;
         let parsed = parseFloat(total).toFixed(2);
         localStorage.setItem('total', parsed);


    }

}














}
