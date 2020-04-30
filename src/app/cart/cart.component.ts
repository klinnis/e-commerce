import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {StorageService} from '../services/storage.service';
import {NgForm} from '@angular/forms';
import { Observable } from "rxjs";



interface Size {
  value: string;
  viewValue: string;
}

interface Color {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})




export class CartComponent implements OnInit {


colorsmen = [];
sizesmen = [];

colorswomen  = [];
sizeswomen = [];

sizeBool = false;
colorBool = false;

selectedColor = '';
selectedSize = '';

finalOrder: any[] = [];

total : Observable<String>;

disablePlus = false;
disableMinus = false;

code: any;

temp: any [] = [];
quantities = [{}];
url = 'http://localhost:3000/uploads/';


  constructor(private userservice: UserService, private storageservice: StorageService) {}

  
  changeColor(color, item) {

  this.selectedColor = color.value;
  const code = item.barcode;
  for (var k = 0; k < localStorage.length; k++){
          let shoe = localStorage.getItem('shoe'+ k);
          if(shoe!== null) {
              let shoeObj = JSON.parse(shoe);
              if(shoeObj.barcode === code) {
              let keyName ='shoe' + k;
              localStorage.setItem(keyName+'Color', color.value);  
              }

          }
          }


  }

  changeSize(size, item) {
  

  const code = item.barcode;
  for (var k = 0; k < localStorage.length; k++){
          let shoe = localStorage.getItem('shoe'+ k);
          if(shoe!== null) {
              let shoeObj = JSON.parse(shoe);
              if(shoeObj.barcode === code) {
              let keyName ='shoe' + k;
              localStorage.setItem(keyName+'Size', size.value);  
              }

          }
          }

  }




  placeOrder() {

 

  let total = 0;
   for (var k = 0; k < localStorage.length; k++){
    let shoe = localStorage.getItem('shoe'+ k);
    if(shoe!== null) {
       let shoeObj = JSON.parse(shoe);
       let keyName ='shoe' + k;
       let color = localStorage.getItem(keyName + 'Color');
       if(color === null){
       this.colorBool = true;
       alert('Please choose a Color');
       return;
       } else {this.colorBool = false}
       let size = localStorage.getItem(keyName + 'Size');
       if(size === null){
       this.sizeBool = true;
       alert('Please choose a Size');
       return;
       } else {this.sizeBool = false}
       const totalString = localStorage.getItem('total');
       const total = parseFloat(totalString);

       this.finalOrder.push({shoeObj, color, size, total});

       
       
    }

   }
   this.userservice.order(this.finalOrder).subscribe((res:any) => this.code = res);
   
  }

  ngOnInit(): void {

        let totalString = localStorage.getItem('total'); 
        this.userservice.totalPrice.next(totalString);
        this.total = this.userservice.totalPrice;





  for (var k = 0; k < localStorage.length; k++) {

      this.storageservice.loadMenShoes(k);
      this.storageservice.loadWomenShoes(k);
}


this.sizesmen = this.sizesmen.reduce((acc, val) => {
  if (!acc.find(el => el.value === val.value)) {
    acc.push(val);
  }
  return acc;
}, []);

this.colorsmen = this.colorsmen.reduce((acc, val) => {
  if (!acc.find(el => el.value === val.value)) {
    acc.push(val);
  }
  return acc;
}, []);


this.sizeswomen = this.sizeswomen.reduce((acc, val) => {
  if (!acc.find(el => el.value === val.value)) {
    acc.push(val);
  }
  return acc;
}, []);

this.colorswomen = this.colorswomen.reduce((acc, val) => {
  if (!acc.find(el => el.value === val.value)) {
    acc.push(val);
  }
  return acc;
}, []);


this.temp = this.storageservice.temp;
this.colorsmen = this.storageservice.colorsmen;
this.colorswomen = this.storageservice.colorswomen;
this.sizesmen = this.storageservice.sizesmen;
this.sizeswomen = this.storageservice.sizeswomen;
 
        }

        Add(shoe: any) {

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


              for (var i = 0; i < localStorage.length; i++){

               if(localStorage.getItem('shoe' + i) !== null){

                   let kati = localStorage.getItem('shoe' + i);

                   let kati1 = JSON.parse(kati);
                    
                   if(kati1.barcode === code) {
                     const name = 'shoe' + i;
                      
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

Remove(shoe: any) {

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

              for (var i = 0; i < localStorage.length; i++){
                 if(localStorage.getItem('shoe' + i) !== null){
                    

                     if(updated_quantity === 0) {
                     localStorage.removeItem('shoe' + i);
                     localStorage.removeItem('shoe' + i + 'Color');
                     localStorage.removeItem('shoe' + i + 'Size');
                     return;
                     }

                   let kati = localStorage.getItem('shoe' + i);
                   let kati1 = JSON.parse(kati);


                   if(kati1.barcode === code) {
                     const name = 'shoe' + i;
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

       




        
                   
  }

