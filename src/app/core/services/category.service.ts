import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) { }

  getCategoriesAll() {
    return this.http.get<any[]>(this.baseUrl + '/category')
      .pipe(
        map(resp => resp['data'])
      )
  }
}
