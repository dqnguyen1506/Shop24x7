import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomepageService } from 'src/app/services/homepage/homepage.service';
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
  productsDisplay: any[] = []
  filtered = false
  filteredId = ''
  constructor(private route: ActivatedRoute, private productService: ProductsService, private _homepageService: HomepageService) {}

  ngOnInit(): void {
    this.filtered = false
    this.filteredId = ''
    //Get the category id and display the corresponding products
    this.route.params.subscribe(p => {
      this.id = p["category_id"]
      this.productService.getProductsListWithCategoryID(this.id).subscribe(pr => {
        this.products = pr.products
        this.productsDisplay = this.products
        this.products.forEach(pp=>{
          pp.category = pp.category.toLowerCase()
        })
        this.categoryName = pr.category.toLowerCase()
      })
    })
  }

  addToCart(product:any){

    this._homepageService.addToCart(product).subscribe(res => {
      if (res.status == "success"){
        alert('Added the product to the cart successfully ')

      }
  })
}

  //User has selected a radio button
  filterSelect(filter: string){
    let radio = document.getElementById(filter) as HTMLInputElement
    //Are we trying to filter the same button?  If so, uncheck and remove filter
    if (this.filtered && filter === this.filteredId) {
      radio.checked = false
      this.filtered = false
      this.filteredId = ''
      this.productsDisplay = this.products
    }
    //Adding a filter
    else {
      this.filtered = true
      this.filteredId = filter
      //Which filter?
      switch (filter) {
        case '5-50':
        this.productsDisplay = this.products.filter(p=>p.discountPrice >= 5.00 && p.discountPrice <= 50.00)
        break;
        case '50-150':
        this.productsDisplay = this.products.filter(p=>p.discountPrice >= 50.00 && p.discountPrice <= 150.00)
        break;
        case '150-500':
        this.productsDisplay = this.products.filter(p=>p.discountPrice >= 150.00 && p.discountPrice <= 500.00)
        break;
        case '500-1500':
        this.productsDisplay = this.products.filter(p=>p.discountPrice >= 500.00 && p.discountPrice <= 1500.00)
        break;
        case '1500-5000':
        this.productsDisplay = this.products.filter(p=>p.discountPrice >= 1500.00 && p.discountPrice <= 5000.00)
        break;
      }
    }
  }
}
