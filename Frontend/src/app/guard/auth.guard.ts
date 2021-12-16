import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token = ""
  decodedToken: { [key: string]: string } | undefined;
  constructor(private _authService: AuthService, private route: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //if authenticated/logged in
      if (this._authService.isAuthenticated()){
        console.log("It's authenticated")
        //cannot go to /login
        if(state.url === "/login"){
          this.route.navigate(['/home'])
        }
        return true
      }
      //if admin
      else if (this._authService.isAuthenticated() && route.data['role'] === "admin"){
        if(localStorage.getItem("role") === "admin"){
          return true
        } 
      }
      //if not authenticated for every component except login
      if(state.url !== "/login"){
        //redirect to /home
        this.route.navigate(['/home'])
        return false;
      }
      //if login, go to /login
      return true
  }
  
}
