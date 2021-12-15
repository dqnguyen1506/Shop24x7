import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  addingProduct = new FormGroup({
    productName: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    discountprice: new FormControl('', Validators.required),
    productimage: new FormControl('', Validators.required),
    productdescription: new FormControl('', Validators.required),
  })

  constructor() { }

  ngOnInit(): void {
  }
  
  receivingProductData() {
    console.log(this.addingProduct)
  }

}
