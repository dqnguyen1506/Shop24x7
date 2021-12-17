import { Component, Injectable, OnInit } from '@angular/core';
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
    // localStorage.setItem('search', '')
    var s = this.search
    var r = this.route
    document.getElementById('search')?.addEventListener('keyup', function(e){ s(e, r)}, false)
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

  search(e: any, route: Router) {
    let searchText = document.getElementById('search') as HTMLInputElement
    localStorage.setItem('search', searchText.value)
    if (e.key == "Enter")
    {
      if (route.url === '/products')
      {
        window.location.reload()
      }
      else
        route.navigate(['/products'])
    }
  }
}
