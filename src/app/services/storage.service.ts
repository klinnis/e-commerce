import { Injectable } from '@angular/core';
import {UserService} from '../services/user.service';

interface Size {
  value: string;
  viewValue: string;
}

interface Color {
  value: string;
  viewValue: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

colorsmen: Color[] = [];
sizesmen: Size[] = [];

colorswomen: Color[] = [];
sizeswomen: Size[] = [];
temp: any [] = [];

  constructor(private userservice: UserService) { }


saveOrUpdateShoeInLocal(shoes: any, i: any, category: string) {
	
    // Add shoe if not exists in LocalStorage

    const checkShoe = localStorage.getItem('shoe' + i + category); 
    if(checkShoe === null) {
        shoes.cart_quantity = 1;
        shoes.cart_price = shoes.price;
        localStorage.setItem('shoe'+ i + category, JSON.stringify(shoes));
                           } 
        else {

       // Update shoe if exists in LocalStorage

       let quantInt = parseInt(shoes.cart_quantity);
       quantInt = +quantInt + 1;
       let shoePrice = shoes.price * quantInt;
       let finalShoePrice = shoePrice.toFixed(2);
       shoes.cart_price = finalShoePrice;
       let quantString = quantInt.toString();
       shoes.cart_quantity = quantString;
       localStorage.setItem('shoe'+ i, JSON.stringify(shoes));
             }
}


updateBasketAndTotalPrice(shoes: any) {

    // Update Basket Subject and Save to LocalStorage
	
	let basket_value = this.userservice.basketCount.getValue();
    let new_basket_value = +basket_value + 1;
    this.userservice.basketCount.next(new_basket_value);
    let count_int_value = this.userservice.basketCount.getValue();
    let string_count = count_int_value.toString();
    localStorage.setItem('count', string_count);

    // Update total Price and save to LocalStorage 

    let total = localStorage.getItem('total');
         if(total === null) {
         let shoePrice = shoes.price;
         localStorage.setItem('total', shoePrice);
                            } 
         else {
         
         total = +total + shoes.price;
         let parsed = parseFloat(total).toFixed(2);
         localStorage.setItem('total', parsed);
              }
}


loadMenShoes(k: any) {
  
          const shoes_men = localStorage.getItem('shoe' + k + 'men');
           
          
          if(shoes_men !== null){
          let obj_men = JSON.parse(shoes_men);
          let objColorsMen = obj_men.colors;
          let objSizesMen= obj_men.sizes;

        
          let colorsLenghtMen = Object.keys(objColorsMen).length;
          let sizesLenghtMen = Object.keys(objSizesMen).length;


            
            for(var j=0; j< colorsLenghtMen; j++){
               this.colorsmen.push({value: objColorsMen[j], viewValue: objColorsMen[j]});
            }

             for(var n=0; n< sizesLenghtMen; n++){
               this.sizesmen.push({value: objSizesMen[n], viewValue: objSizesMen[n]});
            }


           
          if(obj_men.cart_quantity !== 0){
           this.temp.push(obj_men);
          }
          } 


}


loadWomenShoes(k: any) {

          const shoes_women = localStorage.getItem('shoe' + k + 'women');
  
          if(shoes_women !== null){
          let obj_women = JSON.parse(shoes_women);
          let objColorsWomen = obj_women.colors;
          let objSizesWomen= obj_women.sizes;

        
          let colorsLenghtWomen = Object.keys(objColorsWomen).length;
          let sizesLenghtWomen = Object.keys(objSizesWomen).length;


            
            for(var j=0; j< colorsLenghtWomen; j++){
               this.colorswomen.push({value: objColorsWomen[j], viewValue: objColorsWomen[j]});
            }

             for(var n=0; n< sizesLenghtWomen; n++){
               this.sizeswomen.push({value: objSizesWomen[n], viewValue: objSizesWomen[n]});
            }


           
          if(obj_women.cart_quantity !== 0){
           this.temp.push(obj_women);
          }
          } // END IF FOR WOMEN 


}







}



