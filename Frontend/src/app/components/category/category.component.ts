import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  id : any
  categoryName:string = "";
  products: any[] = []
  constructor(private route: ActivatedRoute, private productService: ProductsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.id = p["category_id"]
      /*
      console.log(this.id)
      this.categoryName =this.route.snapshot.queryParamMap.get('category_name') as string
      this.productService.getProductsListWithCategoryID(this.id).subscribe(pr => {
        this.products = pr.products
      })*/
      this.productService.getProductsListWithCategoryID(this.id).subscribe(pr => {
        console.log(pr)
        this.products = pr.products
        console.log(this.products)
        this.categoryName = pr.category
      })
    })
  }

  addToCart() {
    console.log('added')
  }

}
