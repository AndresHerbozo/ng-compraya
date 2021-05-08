import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopPointService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) { }

  getShopPointsAll() {
    return this.http.get<any[]>(this.baseUrl + '/store')
      .pipe(
        map(resp => resp['data'])
      )
  }
}
