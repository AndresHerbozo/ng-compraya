import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as services from './services';

@NgModule({
  imports: [
    CommonModule
  ], 
  providers: [
    services.CategoryService,
    services.SubcategoryService,
    services.BrandService,
    services.ShopPointService,
    services.ProductService
  ]
})
export class CoreModule { }
