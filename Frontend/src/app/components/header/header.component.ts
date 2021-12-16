import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router, public _authService: AuthService) { }

  ngOnInit(): void {}

  logOut(){
    //reset token and role upon rendering /role
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.route.navigate(['/login'])
  }
}
