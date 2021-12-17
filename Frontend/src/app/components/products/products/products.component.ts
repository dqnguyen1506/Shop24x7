import { Component, Injectable, OnInit } from '@angular/core';
import { HomepageService } from 'src/app/services/homepage/homepage.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  productsList: any[] = []
  search = ''


  constructor(private _productsService : ProductsService, private _homepageService: HomepageService) { }

  ngOnInit(): void {
    this._productsService.getProductsList().subscribe(res => {
      if (res.status == "success"){
        var s = localStorage.getItem('search')
        this.productsList = res.products
        if (s && s !== '') {
          this.search = s;
        }
          
      }
    });
  }

  addToCart(product:any){
    
    this._homepageService.addToCart(product).subscribe(res => {
      if (res.status == "success"){
        alert('Added the product to the cart successfully ')

      }
  })
}

  
}
