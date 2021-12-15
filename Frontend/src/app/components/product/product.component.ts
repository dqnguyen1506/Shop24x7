import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {

  id : any

  products: any[] = [
    {
      "id": "0",
      "name": "Smart Phone",
      "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-xs-max-spacegray?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1579299535473",
      "price": 100,
      "discountPrice": 9.99,
      "description": "Apple iPhone 10",
      "category": "Technology",
      "isTopProduct": false
    },
    {
      "id": "1",
      "name": "Flatscreen TV",
      "image": "https://images.samsung.com/is/image/samsung/au-ru7100-ua55ru7100wxxy-rperspectiveblack-152560884?$720_576_PNG$",
      "price": 299.99,
      "discountPrice": 99.99,
      "description": "50\" Samsung TV",
      "category": "Technology",
      "isTopProduct": false
    },
    {
      "id": "2",
      "name": "PC",
      "image": "https://www.hp.com/us-en/shop/app/assets/images/product/3UQ96AA%23ABA/center_facing.png?_=1585731129147",
      "price": 499.99,
      "discountPrice": 99.99,
      "description": "HP Desktop Computer",
      "category": "Technology",
      "isTopProduct": false
    },
    {
      "id": "3",
      "name": "Game Console",
      "image": "https://www.nme.com/wp-content/uploads/2020/06/ps5-credit-sie@2000x1270.jpg",
      "price": 399.99,
      "discountPrice": 79.99,
      "description": "Sony PS5 Gaming Console",
      "category": "Technology",
      "isTopProduct": true
    },
    {
      "id": "4",
      "name": "Game Console",
      "image": "https://m.media-amazon.com/images/I/41uz1G1QNjL._SX425_.jpg",
      "price": 399.99,
      "discountPrice": 199.99,
      "description": "Microsoft Xbox One",
      "category": "Technology",
      "isTopProduct": false
    },
    {
      "id": "5",
      "name": "Pizza",
      "image": "https://d3lbhvavid9616.cloudfront.net/assets/products/3119/0.jpg",
      "price": 7.99,
      "discountPrice": 1.99,
      "description": "Home Run Inn Frozen Pizza",
      "category": "Food",
      "isTopProduct": true
    }
  ]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.id = p["product_id"]
    })
  }

}
