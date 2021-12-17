import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminPageService } from 'src/app/services/admin/admin-page.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  //Form validation 
  addingProduct = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    discountPrice: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    isTopProduct : new FormControl(false)
  })

  constructor(private _adminPageService : AdminPageService, private _router: Router) { }

  ngOnInit(): void {
  }

  //admin can add a new product using the form to the product list
  receivingProductData(product:any) {
    console.log(product)

    this._adminPageService.addNewProduct(product).subscribe(res => {
      if (res.status == "success"){
        // this.productsList = res.products
        console.log(res)
        alert('SUCCESS!! :-)\n\n'+JSON.stringify(product.name)+' has been added successfully');
        this._router.navigate(['/admin/products'])

      }
    });

  }

}
