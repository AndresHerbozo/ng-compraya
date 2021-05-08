import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as services from '../../services';
import * as actions from '../actions/masterdata.actions';
import { Category } from '../../models/response/category.model'; 
import { SubCategory } from '../../models/response/subcategory.model';
import { Brand } from '../../models/response/brand.model';
import { ShopPoint } from "../../models/response/shop-point.model";

import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class MasterDataEffects {
    constructor(
        private actions$: Actions,
        private categoryServices: services.CategoryService,
        private subCategoryServices: services.SubcategoryService,
        private brandService: services.BrandService,
        private shopPointService: services.ShopPointService
    ) { }


    getAllCategories$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(actions.getAllCategoriesReq),
                mergeMap(
                    () => this.categoryServices.getCategoriesAll()
                        .pipe(
                            map((categories: Category[]) => actions.getAllCategoriesRes({ categories: [...categories] }))
                        )
                )
            )
    );

    getAllSubCategories$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(actions.getAllSubCategoriesReq),
                mergeMap(
                    () => this.subCategoryServices.getSubCagoriesAll()
                        .pipe(
                            map((subcategories: SubCategory[]) => actions.getAllSubCategoriesRes({ subcategories: [...subcategories] }))
                        )
                )
            )
    );

    getAllBrands$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(actions.getAllBrandsReq),
                mergeMap(
                    () => this.brandService.getBrandsAll()
                        .pipe(
                            map((brands: Brand[]) => actions.getAllBrandsRes({ brands: [...brands] }))
                        )
                )
            )
    );

    getAllShopPoints$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(actions.getAllShopPointsReq),
                mergeMap(
                    () => this.shopPointService.getShopPointsAll()
                        .pipe(
                            map((shoppoints: ShopPoint[]) => actions.getAllShopPointsRes({ shoppoints: [...shoppoints] }))
                        )
                )
            )
    );
}