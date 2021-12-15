import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  productDetail: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['id']);

      this._productsService.getProduct(params['id']).subscribe((res) => {
        if (res.status == 'success') {
          this.productDetail = res.product;
          console.log(res.product);
        }
      });
    });
  }
}
