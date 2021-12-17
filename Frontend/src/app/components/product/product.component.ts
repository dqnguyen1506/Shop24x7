import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HomepageService } from 'src/app/services/homepage/homepage.service';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {

  id : any


  products : any[] = []
  product : any = {
    "_id": "",
      "name": "",
      "image": "",
      "price": "",
      "discountPrice": "",
      "description": "",
      "category": "",
      "isTopProduct": "",
      "createdOn": ""
  }

  constructor(private route: ActivatedRoute, private productService: ProductsService, private _homepageService: HomepageService) { }

  ngOnInit(): void {
    //Get the product id and retrieve corresponding
    this.route.params.subscribe(p => {
      this.id = p["product_id"]
      this.productService.getProduct(this.id).subscribe(pp=>{
        this.product = pp.product
      })
    })

    //Get all product information for the suggested products
    this.productService.getProductsList().subscribe(ps => {
      this.products = ps.products
    })
  }

  addToCart(product:any){

    this._homepageService.addToCart(product).subscribe(res => {
      if (res.status == "success"){
        alert('Added the product to the cart successfully ')

      }
  })
}


}
