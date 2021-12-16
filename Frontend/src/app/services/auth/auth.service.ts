import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}
  // check if user is authenticated
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired

    //authenticated
    if (token){
        //if token expired
        if(this.jwtHelper.isTokenExpired(token!)){
            console.log("expired token")
            return false
        }
        //not expired
        return true
    }
    // not signed in
    return false
  }
  
  //check if user is admin
  public isAdmin(): boolean {
    if(localStorage.getItem("role") === "admin"){
      return true
    }
    //not admin
    return false
  }
}