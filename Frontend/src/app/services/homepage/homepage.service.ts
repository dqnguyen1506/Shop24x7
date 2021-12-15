import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  private apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }
  
  
  getBannerList(): Observable<any> {
    const url = this.apiUrl + "/api/v1/homepage/banner"
    return this.http.get(url);
  }

  getCategoriesList(): Observable<any> {
    const url = this.apiUrl + "/api/v1/homepage/categories"
    return this.http.get(url);
  }

  getProductsList(): Observable<any> {
    const url = this.apiUrl + "/api/v1/homepage/products"
    return this.http.get(url);
  }
}

