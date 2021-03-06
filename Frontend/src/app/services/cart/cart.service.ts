import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  api!: string

  constructor(private http: HttpClient) { 
    this.api = "http://localhost:8080" + "/api/v1/cart"
  }

  //Get the list of items in the cart that is added
  getcart() : Observable<any> {
    return this.http.get(this.api)
  }

  //Delete Product from the cart (Remove option)
  deleteCart(id: number) : Observable<any> {
    let param: any = {'productId': id};
    console.log(param)
    return this.http.delete(this.api+'/'+id, {params : param})
  }
}


