import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired
    //signed in
    if (token){
        //if expired
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
}