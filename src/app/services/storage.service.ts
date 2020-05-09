import { Injectable } from '@angular/core';
import {UserService} from '../services/user.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {Router} from '@angular/router';

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

colorskids: Color[] = [];
sizeskids: Size[] = [];
temp: any [] = [];
temp1 = new Subject;
temp8 = [];


buttons: any [] = [];


disablePlus = new BehaviorSubject<Number>(0);
disableMinus = false;

disBasket = false;

finalOrder: any[] = [];



order_number = new BehaviorSubject<String>('');
colorBool = new BehaviorSubject<boolean>(false);
sizeBool = new BehaviorSubject<boolean>(false);
temp3 = new Subject();

  constructor(private userservice: UserService) { }


saveOrUpdateShoeInLocal(shoes: any, i: any, category: string) {

	
    // Add shoe if not exists in LocalStorage

    const checkShoe = localStorage.getItem('shoe '+shoes.barcode+ '\xa0'+category); 
    if(checkShoe === null) {
        shoes.cart_quantity = 1;
        shoes.cart_price = shoes.price;
        localStorage.setItem('shoe '+shoes.barcode + '\xa0' +category, JSON.stringify(shoes));
                           } 
        else {

       // Update shoe if exists in LocalStorage
          let obj = JSON.parse(checkShoe);
       let quantInt = obj.cart_quantity;
       if(obj.cart_quantity >= obj.quantity){
        this.disBasket = true;
         return true;
       } else {this.disBasket = false;}

       quantInt = +quantInt + 1;
       let shoePrice = obj.price * quantInt;
       let finalShoePrice = shoePrice.toFixed(2);
       obj.cart_price = finalShoePrice;
       obj.cart_quantity = quantInt;
     
       localStorage.setItem('shoe '+shoes.barcode + '\xa0' +category, JSON.stringify(obj));
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










changeSize(size: any, item: any, category: string) {
      
          const code = item.barcode;
          this.sizeBool.next(true);
          for (var k = 0; k < localStorage.length; k++){
          let shoe = localStorage.getItem('shoe '+code+ '\xa0'+category);
          if(shoe!== null) {
              let shoeObj = JSON.parse(shoe);
              if(shoeObj.barcode === code) {
              let keyName ='shoe '+code+ '\xa0'+category;
              localStorage.setItem(code+'\xa0'+category+' Size', size);  
              }

          }
          }
  
}

changeColor(color: any, item: any, category: string) {

          const code = item.barcode;
          this.colorBool.next(true);
          for (var k = 0; k < localStorage.length; k++){
          let shoe = localStorage.getItem('shoe '+code+ '\xa0'+category);
          console.log(shoe);
          if(shoe!== null) {
              let shoeObj = JSON.parse(shoe);
              if(shoeObj.barcode === code) {
              let keyName ='shoe '+code+ '\xa0'+category;
              localStorage.setItem(code+'\xa0'+category+' Color', color);  
              }

          }
          }
  
}


addShoe(shoe: any, category: any, i: any) {


        // Update total subject and LocalStorage

        let totalString = localStorage.getItem('total');
        let totalInt = parseFloat(totalString);
        let updated = +totalInt + shoe.price;
        let updatedString = updated.toFixed(2);
        localStorage.setItem('total', updatedString);
        this.userservice.totalPrice.next(updatedString);
     
        const code = shoe.barcode;
        let updated_quantity = +shoe.cart_quantity + 1;

        let count = localStorage.getItem('count');
        let countInt = parseInt(count);
        countInt = countInt + 1;
        let updatedCount = countInt.toString();
        localStorage.setItem('count', updatedCount);
        this.userservice.basketCount.next(countInt);

        let item = localStorage.getItem('shoe '+shoe.barcode+ '\xa0'+category);
        if(item!==null){

             let parseItem = JSON.parse(item);
             let name = 'shoe '+shoe.barcode+ '\xa0'+category;
             parseItem.cart_quantity = parseItem.cart_quantity +1;
             let floated_cart = parseFloat(parseItem.cart_price);
             let final_total = floated_cart + parseItem.price;
             let total_string = final_total.toFixed(2);
             parseItem.cart_price = total_string;
             localStorage.setItem(name, JSON.stringify(parseItem));

             this.temp8.push(parseItem.barcode,parseItem.cart_quantity, final_total);
             this.temp1.next(this.temp8);
             this.temp8 = [];
            
        }

     
  
}


removeShoe(shoe: any, category: any, i: any) {

        
        localStorage.setItem('plus', 'false');

        // Update Total in LocalStorage

        let totalString = localStorage.getItem('total');
        let totalInt = parseFloat(totalString);
        let updated = +totalInt - shoe.price;
        let updatedString = updated.toFixed(2);
        localStorage.setItem('total', updatedString);
        this.userservice.totalPrice.next(updatedString);

        const code = shoe.barcode;
        let updated_quantity = +shoe.cart_quantity - 1;
        let empty = false;

        let count = localStorage.getItem('count');
        let countInt = parseInt(count);
        countInt = countInt - 1;
        let updatedCount = countInt.toString();
        localStorage.setItem('count', updatedCount);
        this.userservice.basketCount.next(countInt);
      
        let item = localStorage.getItem('shoe '+shoe.barcode+ '\xa0'+category);
        if(item!==null){

             let parseItem = JSON.parse(item);
             let name = 'shoe '+shoe.barcode+ '\xa0'+category
             if(parseItem.cart_quantity === 1){
               localStorage.removeItem('shoe '+shoe.barcode+ '\xa0'+category);
               return true;
             }
             parseItem.cart_quantity = parseItem.cart_quantity -1;
             let floated_cart = parseFloat(parseItem.cart_price);
             let final_total = floated_cart - parseItem.price;
             let total_string = final_total.toFixed(2);
             parseItem.cart_price = total_string;
             localStorage.setItem(name, JSON.stringify(parseItem));

              this.temp8.push(parseItem.barcode,parseItem.cart_quantity, final_total);
             this.temp1.next(this.temp8);
             this.temp8 = [];
        }
        
}


placeOrder() {
  
    let categories = ['men', 'women', 'kids'];
    for(var n = 0; n < categories.length; n++){
    let total = 0;
    if(localStorage.length === 0){
    alert('Size or Color is missing');
    return;
    }
    for (var k = 0; k < localStorage.length; k++){
    let shoe = localStorage.getItem('shoe'+ k + categories[n]);
    if(shoe!== null) {
       let shoeObj = JSON.parse(shoe);
       let keyName ='shoe' + k + categories[n];
       let color = localStorage.getItem(keyName + 'Color');
       if(color === null){
       this.colorBool.next(false);
       alert('Please choose a Color');
       return;
       }else {this.colorBool.next(true);}
       let size = localStorage.getItem(keyName + 'Size');
       if(size === null){
       this.sizeBool.next(false);
       alert('Please choose a Size');
       return;
       }else{this.sizeBool.next(true);}
       const totalString = localStorage.getItem('total');
       const total = parseFloat(totalString);

       this.finalOrder.push({shoeObj, color, size, total});    
    } else{
      this.colorBool.next(false);
      this.sizeBool.next(false);
      alert('Size or Color is missing');
      return;
    }

   }
   }
   

   this.userservice.order(this.finalOrder).subscribe((res:any) => this.order_number.next(res.codeNum));

   

}




}



