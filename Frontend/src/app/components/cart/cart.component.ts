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
  //Delete method used to remove product fromt the cart
  deleteCart(productId:any){
    console.log(productId);
    this._cartService.deleteCart(productId).subscribe(res => {
      if (res.status == "success"){
        // this.productsList = res.products
        alert('SUCCESS!! :-)\n\n The following product has been deleted successfully :\n\n');
        this.ngOnInit()

      }
    });
  }
}
