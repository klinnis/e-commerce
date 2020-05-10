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

keyNames = [];



order_number = new BehaviorSubject<String>('');
sizeColorBool = new BehaviorSubject<boolean>(false);
temp3 = new Subject();

  constructor(private userservice: UserService, private router: Router) { }


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
          for (var k = 0; k < localStorage.length; k++){
          let shoe = localStorage.getItem('shoe '+code+ '\xa0'+category);
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
  
   
    let total = 0;
    this.finalOrder = [];
    
    for (var k = 0; k < localStorage.length; k++){
    this.keyNames.push(window.localStorage.key(k));
    }

    for(let j=0; j< this.keyNames.length; j++){
    if(this.keyNames[j].startsWith('shoe')){
       let keyname = this.keyNames[j];
       let splitted = keyname.split(" ");
       let code = splitted[1];
       let shoe = localStorage.getItem(keyname);
       let parsedshoe = JSON.parse(shoe);
       let color = localStorage.getItem(code+' Color');
       let size = localStorage.getItem(code+' Size');
       if(color === null || size === null){
       this.sizeColorBool.next(false);
       alert('Please choose color or size');
       return;
       } else {
         this.sizeColorBool.next(true);
         let totalString = localStorage.getItem('total');
         total = parseFloat(totalString);
         this.finalOrder.push({parsedshoe, color, size, total});
       }
    }
    }
    this.keyNames = [];
       
  this.userservice.order(this.finalOrder).subscribe((res:any) => this.order_number.next(res.codeNum));     
         
    setTimeout(() => {
        this.router.navigate(['/main-page']);
    }, 5000);  //5s 

      let keyNames = [];
     for(let k = 0; k < localStorage.length; k++){
           this.keyNames.push(window.localStorage.key(k));
           }
            for(let j=0; j< this.keyNames.length; j++){
                if(this.keyNames[j].startsWith('shoe')){
                  let string = this.keyNames[j];
                  let splitted = string.split(" ");
                  let code = splitted[1];
                  localStorage.removeItem(string);
                  localStorage.removeItem(code+' Color');
                  localStorage.removeItem(code+' Size');  
                }
            }
            this.keyNames = [];

   }
   
   



   






}



