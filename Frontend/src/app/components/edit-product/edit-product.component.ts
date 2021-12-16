import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminPageService } from 'src/app/services/admin/admin-page.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productId: any;
  product: any;

  updateProduct = new FormGroup({
    _id : new FormControl(''),
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    discountPrice: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    isTopProduct : new FormControl()
  });
  constructor(private route: ActivatedRoute, private _adminPageService : AdminPageService, private _router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.productId = p['product_id'];
      this._adminPageService.getProduct(this.productId).subscribe(res => {
        if (res.status == "success"){
          this.product = res.product

          this.updateProduct.setValue({
            _id : this.product._id,
            name: this.product.name,
            category: this.product.category,
            price: this.product.price,
            discountPrice: this.product.discountPrice,
            image: this.product.image,
            description: this.product.description,
            isTopProduct:this.product.isTopProduct
          })
  
        }
      });
    })
  }

  receivingProductData(product:any) {
    console.log(product)

    
    this._adminPageService.updateProduct(product).subscribe(res => {
      if (res.status == "success"){
        // this.productsList = res.products
        console.log(res)
        alert('SUCCESS!! :-)\n\n'+JSON.stringify(product.name)+' has been updated successfully');
        this._router.navigate(['/admin/products'])

      }
    });
  }
}
