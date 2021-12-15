import { Component, OnInit } from '@angular/core';
import { HomepageService } from 'src/app/services/homepage/homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  bannerList: any;
  categoriesList: any;
  productsList: any;


  constructor(private _homepageService : HomepageService) { }

  ngOnInit(): void {

    this._homepageService.getBannerList().subscribe(res => {
      if (res.status == "success"){
        this.bannerList = res.products
        console.log(this.bannerList)

      }
    });

    this._homepageService.getCategoriesList().subscribe(res => {
      if (res.status == "success"){
        this.categoriesList = res.categories
        console.log(this.categoriesList)

      }
    });

    this._homepageService.getProductsList().subscribe(res => {
      if (res.status == "success"){
        this.productsList = res.products
        console.log(this.productsList)

      }
    });

  }

}
