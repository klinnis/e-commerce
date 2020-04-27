import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }





createShoe(brand: string, code: string, price: Number, quantity: Number, category: string, description: string, colors: string [], sizes: string [], filenames: string []) 

{
    const data = {brand: brand, barcode: code, price: price, quantity: quantity, category: category, description: description, colors: colors, sizes: sizes, filenames: filenames};
	return this.http.post('http://localhost:3000/api/v1/admin/create-shoe', data);
}


getOrders() {
	
	return this.http.get('http://localhost:3000/api/v1/admin/get-orders');
}



}