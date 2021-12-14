import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

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
      console.log(userRegistrationForm.get('lName')!.value)
      return this.http.post(url, {"firstName": userRegistrationForm.get('fName')!.value})
  }
}
