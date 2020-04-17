import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
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


colors: Color[] = [];
sizes: Size[] = [];

selectedColor = '';
selectedSize = '';

finalOrder: any[] = [];

total : Observable<Number>;


temp: any [] = [];
quantities = [{}];
url = 'http://localhost:3000/uploads/';


  constructor(private userservice: UserService) {
   }

  
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
       alert('Please choose a Color');
       return;
       }
       let size = localStorage.getItem(keyName + 'Size');
       if(size === null){
       alert('Please choose a Size');
       return;
       }
       const totalString = localStorage.getItem('total');
       const total = parseInt(totalString);
       this.finalOrder.push({shoeObj, color, size, total});
       
    }

   }
   console.log(this.finalOrder);
  }

  ngOnInit(): void {

        let totalString = localStorage.getItem('total');
        let totalInt = parseInt(totalString);
        this.userservice.totalPrice.next(totalInt);
        this.total = this.userservice.totalPrice;



        for (var k = 0; k < localStorage.length; k++){
          const shoes = localStorage.getItem('shoe' + k);
          const quantity = localStorage.getItem('shoeq' + k);
          if(shoes !== null){
          let obj = JSON.parse(shoes);
          let objColors = obj.colors;
          let objSizes= obj.sizes;





        
          let colorsLenght = Object.keys(objColors).length;
          let sizesLenght = Object.keys(objSizes).length;


            
            for(var j=0; j< colorsLenght; j++){
               this.colors.push({value: objColors[j], viewValue: objColors[j]});
            }

             for(var n=0; n< sizesLenght; n++){
               this.sizes.push({value: objSizes[n], viewValue: objSizes[n]});
            }


           
          if(obj.cart_quantity !== 0){
           this.temp.push(obj);
          }
          }        
}

this.sizes = this.sizes.reduce((acc, val) => {
  if (!acc.find(el => el.value === val.value)) {
    acc.push(val);
  }
  return acc;
}, []);

this.colors = this.colors.reduce((acc, val) => {
  if (!acc.find(el => el.value === val.value)) {
    acc.push(val);
  }
  return acc;
}, []);
 
        }

        Add(shoe: any) {

        // Update total subject and LocalStorage

        let totalString = localStorage.getItem('total');
        let totalInt = parseInt(totalString);
        let updated = +totalInt + shoe.price;
        let updatedString = updated.toString();
        localStorage.setItem('total', updatedString);
        this.userservice.totalPrice.next(updated);
	   
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
	        v.cart_price = +v.cart_price + shoe.price;


              for (var i = 0; i < localStorage.length; i++){

               if(localStorage.getItem('shoe' + i) !== null){

                   let kati = localStorage.getItem('shoe' + i);

                   let kati1 = JSON.parse(kati);
                    
                   if(kati1.barcode === code) {
                     const name = 'shoe' + i;
                     kati1.cart_quantity = v.cart_quantity;
                     kati1.cart_price = kati1.cart_price + shoe.price;
                    
                     localStorage.setItem(name, JSON.stringify(kati1));
                   }
               }
               }



	       }
	    }
                           

}

Remove(shoe: any) {

        let totalString = localStorage.getItem('total');
        let totalInt = parseInt(totalString);
        let updated = +totalInt - shoe.price;
        let updatedString = updated.toString();
        localStorage.setItem('total', updatedString);
        this.userservice.totalPrice.next(updated);

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
	       if(updated_quantity == 0) {
	       this.temp.splice(this.temp.findIndex(item => item.barcode === code), 1);
	       empty = true;
	       }
	        v.cart_quantity = updated_quantity;
	         v.cart_price = v.cart_price - shoe.price;

              for (var i = 0; i < localStorage.length; i++){
                 if(localStorage.getItem('shoe' + i) !== null){
                   
                   let kati = localStorage.getItem('shoe' + i);
                   let kati1 = JSON.parse(kati);


                   if(kati1.barcode === code) {
                     const name = 'shoe' + i;
                     console.log(name);
                     kati1.cart_quantity = v.cart_quantity;
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


