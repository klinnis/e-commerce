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

url = 'http://localhost:3000/uploads/'


  searchword: Number;  
 

  constructor(private adminservice: AdminService) {}





  ngOnInit(): void {
  this.adminservice.getOrders().subscribe((result:any) => this.markos = result);
  }

  searchOrder() {
    const word = this.searchword.toString();
    const word1 = parseInt(word);
    this.filtered = this.markos.filter(orders => 
       orders.ordernumber === word1  
    );
    //console.log(this.filtered);
    //this.filtered = [];
    
  }

 

}
