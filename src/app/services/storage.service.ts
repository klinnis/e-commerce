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

disablePlus = false;
disableMinus = false;

finalOrder: any[] = [];

order_number = new BehaviorSubject<String>('');
colorBool = new BehaviorSubject<boolean>(false);
sizeBool = new BehaviorSubject<boolean>(false);

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
          let obj = JSON.parse(checkShoe);
       let quantInt = obj.cart_quantity;
       if(obj.cart_quantity >= obj.quantity){
         return;
       } 
       quantInt = +quantInt + 1;
       let shoePrice = obj.price * quantInt;
       let finalShoePrice = shoePrice.toFixed(2);
       obj.cart_price = finalShoePrice;
       obj.cart_quantity = quantInt;
       localStorage.setItem('shoe'+ i + category, JSON.stringify(obj));
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


loadKidsShoes(k: any) {

          const shoes_kids = localStorage.getItem('shoe' + k + 'kids');
  
          if(shoes_kids !== null){
          let obj_kids = JSON.parse(shoes_kids);
          let objColorsKids = obj_kids.colors;
          let objSizesKids= obj_kids.sizes;

        
          let colorsLenghtKids = Object.keys(objColorsKids).length;
          let sizesLenghtKids = Object.keys(objSizesKids).length;


            
            for(var j=0; j< colorsLenghtKids; j++){
               this.colorskids.push({value: objColorsKids[j], viewValue: objColorsKids[j]});
            }

             for(var n=0; n< sizesLenghtKids; n++){
               this.sizeskids.push({value: objSizesKids[n], viewValue: objSizesKids[n]});
            }


           
          if(obj_kids.cart_quantity !== 0){
           this.temp.push(obj_kids);
          }
          } // END IF FOR KIDS 


}

changeSize(size: any, item: any, category: string) {
      
          const code = item.barcode;
          this.sizeBool.next(true);
          for (var k = 0; k < localStorage.length; k++){
          let shoe = localStorage.getItem('shoe'+ k + category);
          if(shoe!== null) {
              let shoeObj = JSON.parse(shoe);
              if(shoeObj.barcode === code) {
              let keyName ='shoe' + k + category;
              localStorage.setItem(keyName+'Size', size.value);  
              }

          }
          }
  
}

changeColor(color: any, item: any, category: string) {

          const code = item.barcode;
          this.colorBool.next(true);
          for (var k = 0; k < localStorage.length; k++){
          let shoe = localStorage.getItem('shoe'+ k + category);
          if(shoe!== null) {
              let shoeObj = JSON.parse(shoe);
              if(shoeObj.barcode === code) {
              let keyName ='shoe' + k + category;
              localStorage.setItem(keyName+'Color', color.value);  
              }

          }
          }
  
}


addShoe(shoe: any) {

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



      for (let v of this.temp) {
         if(v.barcode == code) {
         if(updated_quantity == 0) {
         this.temp.splice(this.temp.findIndex(item => item.barcode === code), 1);
         return;
         }
          v.cart_quantity = updated_quantity;
          let cartPrice = +v.cart_price + shoe.price;
          v.cart_price = cartPrice.toFixed(2);
          const category = v.category.toLowerCase();

          // Update Cart in LocalStorage

          for (var i = 0; i < localStorage.length; i++){

          if(localStorage.getItem('shoe' + i + category) !== null){

          let kati = localStorage.getItem('shoe' + i + category);

          let kati1 = JSON.parse(kati);
                    
          if(kati1.barcode === code) {
            const name = 'shoe' + i + category;  
            kati1.cart_quantity = v.cart_quantity;
            if(kati1.cart_quantity< kati1.quantity){
              kati1.cart_price = kati1.cart_price + shoe.price;
            } else {
              this.disablePlus = true;
                     }      
            localStorage.setItem(name, JSON.stringify(kati1));
                   }
               }
               }

         }
      }
  
}


removeShoe(shoe: any) {

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
      


      for (let v of this.temp) {
         if(v.barcode == code) {
         if(updated_quantity === 0) {
         this.temp.splice(this.temp.findIndex(item => item.barcode === code), 1);
         empty = true;

         }
          v.cart_quantity = updated_quantity;
          let cartPrice = v.cart_price - shoe.price;
          v.cart_price = cartPrice.toFixed(2);
          const category = v.category.toLowerCase();

          for (var i = 0; i < localStorage.length; i++){
          if(localStorage.getItem('shoe' + i + category) !== null){
             
           if(updated_quantity === 0) {
             localStorage.removeItem('shoe' + i + category);
             localStorage.removeItem('shoe' + i + category + 'Color');
             localStorage.removeItem('shoe' + i + category + 'Size');
             return;
                     }

          let kati = localStorage.getItem('shoe' + i + category);
          let kati1 = JSON.parse(kati);


          if(kati1.barcode === code) {
           const name = 'shoe' + i + category;
           kati1.cart_quantity = v.cart_quantity;
           if(kati1.cart_quantity === 0) {
            return;
            }
             kati1.cart_price = kati1.cart_price - shoe.price;
              if(empty) {kati1.cart_price = 0} 
                localStorage.setItem(name, JSON.stringify(kati1));
                   }
               }
               }

         }
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



