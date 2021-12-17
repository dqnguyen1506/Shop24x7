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

  /*
  products: any[] = [
    {
      "_id": "0",
      "name": "Smart Phone",
      "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-xs-max-spacegray?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1579299535473",
      "price": 100,
      "discountPrice": 9.99,
      "description": "Apple iPhone 10",
      "category": "Technology",
      "isTopProduct": false,
      "createdOn": ""
    },
    {
      "_id": "1",
      "name": "Flatscreen TV",
      "image": "https://images.samsung.com/is/image/samsung/au-ru7100-ua55ru7100wxxy-rperspectiveblack-152560884?$720_576_PNG$",
      "price": 299.99,
      "discountPrice": 99.99,
      "description": "50\" Samsung TV",
      "category": "Technology",
      "isTopProduct": false,
      "createdOn": ""
    },
    {
      "_id": "2",
      "name": "PC",
      "image": "https://www.hp.com/us-en/shop/app/assets/images/product/3UQ96AA%23ABA/center_facing.png?_=1585731129147",
      "price": 499.99,
      "discountPrice": 99.99,
      "description": "HP Desktop Computer",
      "category": "Technology",
      "isTopProduct": false,
      "createdOn": ""
    },
    {
      "_id": "3",
      "name": "Game Console",
      "image": "https://www.nme.com/wp-content/uploads/2020/06/ps5-credit-sie@2000x1270.jpg",
      "price": 399.99,
      "discountPrice": 79.99,
      "description": "Sony PS5 Gaming Console",
      "category": "Technology",
      "isTopProduct": true,
      "createdOn": ""
    },
    {
      "_id": "4",
      "name": "Game Console",
      "image": "https://m.media-amazon.com/images/I/41uz1G1QNjL._SX425_.jpg",
      "price": 399.99,
      "discountPrice": 199.99,
      "description": "Microsoft Xbox One",
      "category": "Technology",
      "isTopProduct": false,
      "createdOn": ""
    },
    {
      "_id": "5",
      "name": "Pizza",
      "image": "https://d3lbhvavid9616.cloudfront.net/assets/products/3119/0.jpg",
      "price": 7.99,
      "discountPrice": 1.99,
      "description": "Home Run Inn Frozen Pizza",
      "category": "Food",
      "isTopProduct": true,
      "createdOn": ""
    },
    {
      "_id": "6",
      "name": "Banana",
      "image": "https://th-thumbnailer.cdn-si-edu.com/4Nq8HbTKgX6djk07DqHqRsRuFq0=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg",
      "price": 4.99,
      "discountPrice": 0.99,
      "description": "A bunch of bananas",
      "category": "Food",
      "isTopProduct": false,
      "createdOn": ""
    }
  ]*/

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
    this.route.params.subscribe(p => {
      this.id = p["product_id"]
      this.productService.getProduct(this.id).subscribe(pp=>{
        this.product = pp.product
      })
    })

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
