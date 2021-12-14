import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api!: string

  constructor(private http: HttpClient) { 
    this.api = "http://localhost:8080"
  }

//   getFoodItemsData(): Observable<any>{
//     return this.http.get(this.url)
//   }

  registerUser(userRegistrationForm: FormGroup): Observable<any>{
      const url = this.api + "/v1/users/register"
      // console.log(userRegistrationForm.get('lName')!.value)
      return this.http.post(url, {
        "firstName": userRegistrationForm.get('fName')!.value,
        "lastName": userRegistrationForm.get('lName')!.value, 
        "password": userRegistrationForm.get('password')!.value, 
        "email": userRegistrationForm.get('email')!.value,
    })
  }

  //Temporary method until learned JWT
  authenticateUser(userLoginForm: FormGroup): Observable<any>{
    const url = this.api + "/v1/users/login"
    let params = new HttpParams();
    params.append('email', userLoginForm.get('email')!.value);
    params.append("password", userLoginForm.get('password')!.value)


    let param: any = {'email': userLoginForm.get('email')!.value, "password": userLoginForm.get('password')!.value};
    return this.http.get(url, {params: param})
  }
}
