import { Component, Injectable, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  productsList: any[] = []
  search = ''


  constructor(private _productsService : ProductsService) { }

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

  
}
