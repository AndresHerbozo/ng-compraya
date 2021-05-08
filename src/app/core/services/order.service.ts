import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Order } from '../models/request/order.mode';

import { map } from 'rxjs/operators';
import { OrderConfirm } from '../models/response/order-confirm.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.api;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  setOrderConfirm(params: Order) {
    let order = {
      idProduct: params.idProduct,
      count: params.count,
      name: params.name,
      fathersLastName: params.fathersLastName,
      mothersLastName: params.mothersLastName,
      dni: params.dni,
      idTienda: params.idTienda
    }

    let parameters = JSON.stringify(order);

    return this.http.post<any>(this.baseUrl + '/payment', parameters, this.httpOptions)
      .pipe(
        map(response => response['data'])
      );
  }
}
