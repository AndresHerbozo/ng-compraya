import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) { }

  getProductsAll() {
    return this.http.get<any[]>(this.baseUrl + '/product')
      .pipe(
        map(resp => {
          let data: any[] = [];
          let responseData = resp['data'];

          for (let item in responseData) {
            data[item] = {
              ...responseData[item],
              priceExtract: responseData[item]['price']['price']
            }
          }

          return [...data];
        })
      );
  }

  getProductDetail(id: number) {
    return this.http.get(`${this.baseUrl}/product/${id}`)
      .pipe(
        map(resp => resp['data'])
      )
  }
}
