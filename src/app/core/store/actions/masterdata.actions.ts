import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/response/category.model';
import { SubCategory } from '../../models/response/subcategory.model';
import { Brand } from '../../models/response/brand.model';
import { ShopPoint } from '../../models/response/shop-point.model';

export const getAllCategoriesReq = createAction(
    '[Category] Get All Collection Req'
);

export const getAllCategoriesRes = createAction(
    '[Category] Get All Collection Res',
    props<{ categories: Category[] }>()
);

export const getAllSubCategoriesReq = createAction(
    '[SubCategory] Get All Collection Req'
);

export const getAllSubCategoriesRes = createAction(
    '[SubCategory] Get All Collection Res',
    props<{ subcategories: SubCategory[] }>()
);

export const getAllBrandsReq = createAction(
    '[Brand] Get All Collection Req'
);

export const getAllBrandsRes = createAction(
    '[Brand] Get All Collection Res',
    props<{ brands: Brand[] }>()
);

export const getAllShopPointsReq = createAction(
    '[ShopPoints] Get All Collection Req'
);

export const getAllShopPointsRes = createAction(
    '[ShopPoints] Get All Collection Res',
    props<{ shoppoints: ShopPoint[] }>()
);