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


finalOrder: any[] = [];

total : Observable<String>;

disablePlus = false;

code: any;

temp: any [] = [];
url = 'http://localhost:3000/uploads/';


  constructor(private userservice: UserService, private storageservice: StorageService) {}

  
  changeColor(color, item) {

  const category = item.category.toLowerCase();
  this.storageservice.changeColor(color, item, category);

  }

  changeSize(size, item) {
  
  const category = item.category.toLowerCase();
  this.storageservice.changeSize(size, item, category);

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

        this.storageservice.addShoe(shoe);
        this.disablePlus = this.storageservice.disablePlus;             
}

Remove(shoe: any) {

        this.storageservice.removeShoe(shoe);
}

       




        
                   
  }

