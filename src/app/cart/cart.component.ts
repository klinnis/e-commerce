import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {StorageService} from '../services/storage.service';
import {NgForm} from '@angular/forms';
import { Observable } from "rxjs";
import {Router} from '@angular/router';




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

colorskids  = [];
sizeskids = [];

sizeBool : Observable<boolean>;
colorBool : Observable<boolean>;


finalOrder: any[] = [];

total : Observable<String>;


code: Observable<String>;
buttons = [];

temp: any [] = [];
url = 'http://localhost:3000/uploads/';






  constructor(private userservice: UserService, private storageservice: StorageService) {
   
      

  }

  
  changeColor(color, item) {

  const category = item.category.toLowerCase();
  this.storageservice.changeColor(color, item, category);

  }

  changeSize(size, item) {
  
  const category = item.category.toLowerCase();
  this.storageservice.changeSize(size, item, category);

  }




  placeOrder() {
    
    this.storageservice.placeOrder();
    this.sizeBool = this.storageservice.sizeBool;
    this.colorBool = this.storageservice.colorBool;
    this.code = this.storageservice.order_number;
    //localStorage.clear();

  }

  ngOnInit(): void {


    
    let totalString = localStorage.getItem('total'); 
    this.userservice.totalPrice.next(totalString);
    this.total = this.userservice.totalPrice;
    this.sizesmen = this.storageservice.sizesmen;
    this.colorsmen = this.storageservice.colorsmen;

    


    for (var k = 0; k < localStorage.length; k++) {
      
      this.storageservice.loadMenShoes(k);
      this.storageservice.loadWomenShoes(k);
      this.storageservice.loadKidsShoes(k);
    }




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

this.sizeskids = this.sizeskids.reduce((acc, val) => {
  if (!acc.find(el => el.value === val.value)) {
    acc.push(val);
  }
  return acc;
}, []);

this.colorskids = this.colorskids.reduce((acc, val) => {
  if (!acc.find(el => el.value === val.value)) {
    acc.push(val);
  }
  return acc;
}, []);


// Remove duplicates
this.temp = this.temp.reduce((acc, val) => {
  if (!acc.find(el => el.barcode === val.barcode)) {
    acc.push(val);
  }
  return acc;
}, []);

// Get allshoes from strorage
this.temp = this.storageservice.temp;
console.log(this.temp);

//Remove duplicates
this.temp = this.temp.reduce((acc, val) => {
  if (!acc.find(el => el.barcode === val.barcode)) {
    acc.push(val);
  }
  return acc;
}, []);




this.colorsmen = this.storageservice.colorsmen;
this.colorswomen = this.storageservice.colorswomen;
this.colorskids = this.storageservice.colorskids;
this.sizeskids = this.storageservice.sizeskids;
this.sizesmen = this.storageservice.sizesmen;
this.sizeswomen = this.storageservice.sizeswomen;


 
        }


Add(shoe: any, i: any) {
         
         let category = shoe.category.toLowerCase(); 

        if(shoe.cart_quantity >= shoe.quantity ) {
        this.buttons = this.buttons.filter(item => item !== 'shoe' + i + category);
        return;
        } 

        this.storageservice.addShoe(shoe);
        this.buttons = this.storageservice.buttons;
       


                    
}

Remove(shoe: any, i: any) {
        let category = shoe.category.toLowerCase(); 
        this.storageservice.removeShoe(shoe);

        var element = <HTMLInputElement> document.getElementById(i);
        element.disabled = false;
        this.buttons = this.buttons.filter(item => item !== 'shoe' + i + category);
        
        
}

check(i: any) {

  return  this.buttons.includes(i);
}

       




        
                   
  }

