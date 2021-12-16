import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HomepageService } from 'src/app/services/homepage/homepage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categoriesList: any

  constructor(private route: Router, public _authService: AuthService, private _homepageService : HomepageService) { }

  ngOnInit(): void {
    this._homepageService.getCategoriesList().subscribe(res => {
      if (res.status == "success"){
        this.categoriesList = res.categories
      }
    });
  }

  logOut(){
    //reset token and role upon rendering /role
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.route.navigate(['/login'])
  }
}
