import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class AdminPageService {
  private apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getProductsList(): Observable<any> {
    const url = this.apiUrl + "/api/v1/products"
    return this.http.get(url);
  }

  getProduct(id:any): Observable<any> {
    const url = this.apiUrl + "/api/v1/products/"+id
    return this.http.get(url);
  }

  addNewProduct(product:any): Observable<any> {
    const url = this.apiUrl + "/api/v1/admin/products"
    return this.http.post(url, product,httpOptions);
  }

  deleteProduct(id:string): Observable<any> {
    const url = this.apiUrl + "/api/v1/admin/products/"+id
    return this.http.delete(url);
  }

  // /api/v1/admin/products/:id
  updateProduct(product:any): Observable<any> {
    const url = this.apiUrl + "/api/v1/admin/products/"+product._id
    return this.http.patch(url, product,httpOptions);
  }
}
