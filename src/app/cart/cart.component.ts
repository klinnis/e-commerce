import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {StorageService} from '../services/storage.service';
import {NgForm} from '@angular/forms';
import { Observable, Subject } from "rxjs";
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

sizeColorBool : Observable<boolean>;



finalOrder: any[] = [];

total : Observable<String>;


code: Observable<String>;
buttons = [];

temp: any [] = [];
url = 'http://localhost:3000/uploads/';

dis = false;


keyNames = [];






  constructor(private userservice: UserService, private storageservice: StorageService) {

     let keyNames = [];
     for(let k = 0; k < localStorage.length; k++){
           this.keyNames.push(window.localStorage.key(k));
           }
            for(let j=0; j< this.keyNames.length; j++){
                if(this.keyNames[j].startsWith('shoe')){
                  let string = this.keyNames[j];
                  let splitted = string.split(" ");
                  let code = splitted[1];
                  localStorage.removeItem(code+' Color');
                  localStorage.removeItem(code+' Size');  
                }
            }
            this.keyNames = [];
       
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
    this.sizeColorBool = this.storageservice.sizeColorBool;
    this.code = this.storageservice.order_number;
    //localStorage.clear();

  }



  ngOnInit(): void {

   
    
    let totalString = localStorage.getItem('total'); 
    this.userservice.totalPrice.next(totalString);
    this.total = this.userservice.totalPrice;
    this.sizesmen = this.storageservice.sizesmen;
    this.colorsmen = this.storageservice.colorsmen;



 
         for(let k = 0; k < localStorage.length; k++){
           this.keyNames.push(window.localStorage.key(k));
           }
            for(let j=0; j< this.keyNames.length; j++){
                if(this.keyNames[j].startsWith('shoe')){
                  let string = this.keyNames[j];
                  let temp = localStorage.getItem(string);
                  let temp1 = JSON.parse(temp);
                  this.temp.push(temp1);
                  
                }
            }
            this.keyNames = [];
           


this.storageservice.temp1.subscribe(result => {
 let fic = result[2].toFixed(2);
 let proson = this.temp.filter(x => x.barcode == result[0]);
 proson[0].cart_quantity = result[1];
 proson[0].cart_price = fic;

});


 


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





//Remove duplicates
this.temp = this.temp.reduce((acc, val) => {
  if (!acc.find(el => el.barcode === val.barcode)) {
    acc.push(val);
  }
  return acc;
}, []);





 
        }


Add(shoe: any, i: any) {
         
        let category = shoe.category.toLowerCase(); 
        let barcode = shoe.barcode;
        let item = localStorage.getItem('shoe '+barcode+ '\xa0'+category);
        let parsedItem = JSON.parse(item);

        if(parsedItem.cart_quantity >= parsedItem.quantity){

        var element = <HTMLInputElement> document.getElementById(i);
        element.disabled = true;
        return;
        }

        this.storageservice.addShoe(shoe, category, i);
       
                    
}

Remove(shoe: any, i: any) {

     
        
        let category = shoe.category.toLowerCase(); 
        let dis = this.storageservice.removeShoe(shoe,category,i);
        if(dis) {
        this.buttons.push(i);
        }


        
        
        
        
}

check(i: any) {

  return  this.buttons.includes(i);
}

       




        
                   
  }

