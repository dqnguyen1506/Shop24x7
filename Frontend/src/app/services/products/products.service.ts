import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  //Get all products
  getProductsList(): Observable<any> {
    const url = this.apiUrl + "/api/v1/products"
    return this.http.get(url);
  }

  //Get a specific product
  getProduct(id:any): Observable<any> {
    const url = this.apiUrl + "/api/v1/products/"+id
    return this.http.get(url);
  }

  //Get products in a certain category
  getProductsListWithCategoryID(id:any): Observable<any> {
    const url = this.apiUrl + "/api/v1/categories/"+id
    return this.http.get(url);
  }
}





