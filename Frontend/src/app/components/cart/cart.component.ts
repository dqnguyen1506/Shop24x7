import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productInfo: any; 

  constructor(private _cartService : CartService, private route : Router) { }

  ngOnInit(): void {
    this._cartService.getcart().subscribe(res =>{
      this.productInfo = res.cart
      console.log(this.productInfo)
    })
  }
}
