import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

markos: any[] = [];
filtered: any[] = [];
total = 0;

url = 'http://localhost:3000/uploads/'


  searchword: Number;  
 

  constructor(private adminservice: AdminService) {}





  ngOnInit(): void {
  this.adminservice.getOrders().subscribe((result:any) => this.markos = result);
  }

  searchOrder() {
    
    const word = this.searchword.toString();
    const word1 = parseInt(word);
  
    const checkEmpty = isNaN(word1);
    if(checkEmpty) {
    this.filtered = [];
    this.total = 0;
    return;
    }
    this.filtered = this.markos.filter(orders => 
       orders.ordernumber === word1  
    );
  if (Array.isArray(this.filtered) && this.filtered.length) {
   this.total = this.filtered[0].total;
   } else {
     return;
   }

    
  }

 

}
