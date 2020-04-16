import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

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

temp: any [] = [];
quantities = [{}];
url = 'http://localhost:3000/uploads/';


  constructor(private userservice: UserService) { }

  ngOnInit(): void {

        for (var k = 0; k < localStorage.length; k++){
          const shoes = localStorage.getItem('shoe' + k);
          const quantity = localStorage.getItem('shoeq' + k);
          if(shoes !== null){
          let obj = JSON.parse(shoes);
            console.log(obj.colors);
          if(obj.cart_quantity !== 0){
           this.temp.push(obj);
          }
          }        
}  
        }

        Add(shoe: any) {
	   
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


