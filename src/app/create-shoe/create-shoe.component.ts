import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormControl,FormArray, FormBuilder, Validators } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-create-shoe',
  templateUrl: './create-shoe.component.html',
  styleUrls: ['./create-shoe.component.css']
})
export class CreateShoeComponent implements OnInit {

brand = new FormControl('');
code = new FormControl('');
price = new FormControl('');
quantity = new FormControl('');
category = new FormControl('');
description = new FormControl('');

selectedFile: File = null;
    fd = new FormData();
    imageStatus: any;
    filenames: string [] = [];


constructor(private fb:FormBuilder, private _ngZone: NgZone, private http: HttpClient, 
private adminservice: AdminService) { }

   ngOnInit(): void {
   }

   

@ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onFileSelected(event) {
   this.selectedFile = <File>event.target.files[0];
   this.fd.append('file', this.selectedFile, this.selectedFile.name);
   this.filenames.push(this.selectedFile.name);
   this.http.post('http://localhost:3000/api/v1/admin/save-images', this.fd)
   .subscribe(res => this.imageStatus = res);
   this.fd = new FormData();

  }


colorForm = new FormGroup({
	

  colors: new FormArray([
      new FormControl('', Validators.required)
  ]),

  sizes: new FormArray([
      new FormControl('', Validators.required)
  ]),

  

});

get colors(): FormArray {
	return this.colorForm.get('colors') as FormArray;
}

get sizes(): FormArray {
	return this.colorForm.get('sizes') as FormArray;
}

addColorField() {
	this.colors.push(new FormControl('', Validators.required));
}

addSizeField() {
	this.sizes.push(new FormControl('', Validators.required));
}


submit() {

const brand = this.brand.value;
const code = this.code.value;
const price = this.price.value;
const quantity = this.quantity.value;
const category = this.category.value;
const description = this.description.value;

const colorsArray = this.colorForm.get('colors') as FormArray;
const sizesArray = this.colorForm.get('sizes') as FormArray;
const colors = colorsArray.value;
const sizes = sizesArray.value;

const filenames = this.filenames;

this.adminservice.createShoe(brand, code, price, quantity, category, description, colors, sizes, filenames)
.subscribe(res => console.log(res));

}
   
 

 


}
