import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) { }

  getBrandsAll() {
    return this.http.get<any[]>(this.baseUrl + '/brand')
      .pipe(
        map(resp => resp['data'])
      )
  }
}
