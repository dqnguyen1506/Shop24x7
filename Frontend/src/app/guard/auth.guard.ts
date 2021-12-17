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
        //if admin requirement
        if(route.data['role'] === "admin"){
          //if user is not admin, re-reroute to home
          if(!this._authService.isAdmin()){
            this.route.navigate(['/home'])
            return false
          }
        }
        return true
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
