import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'; 

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) { }

  getSubCagoriesAll() {
    return this.http.get<any[]>(this.baseUrl + '/subcategory')
      .pipe(
        map(resp => resp['data'])
      )
  }
}
