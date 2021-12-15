import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsList: any;


  constructor(private _productsService : ProductsService) { }

  ngOnInit(): void {
    this._productsService.getProductsList().subscribe(res => {
      if (res.status == "success"){
        this.productsList = res.products
        console.log(this.productsList)

      }
    });
  }

}
