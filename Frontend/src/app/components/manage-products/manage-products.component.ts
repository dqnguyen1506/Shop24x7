import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPageService } from 'src/app/services/admin/admin-page.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  productsList: any;

  constructor(private _adminPageService : AdminPageService, private _router: Router) { }

  ngOnInit(): void {

    this._adminPageService.getProductsList().subscribe(res => {
      if (res.status == "success"){
        this.productsList = res.products
        console.log(this.productsList)

      }
    });
  }

  deleteProduct(product:any){
    console.log(product._id);
    this._adminPageService.deleteProduct(product._id).subscribe(res => {
      if (res.status == "success"){
        // this.productsList = res.products
        alert('SUCCESS!! :-)\n\n The following product has been deleted successfully :\n\n ' + JSON.stringify(product.name));
        this.ngOnInit()

      }
    });
  }

}
