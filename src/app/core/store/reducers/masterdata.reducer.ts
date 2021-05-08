import { Category } from '../../models/response/category.model';
import { SubCategory } from '../../models/response/subcategory.model';
import { Brand } from '../../models/response/brand.model';
import { ShopPoint } from '../../models/response/shop-point.model';
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/masterdata.actions';

export interface MasterDataState {
    categories: Category[],
    subcategories: SubCategory[],
    brands: Brand[], 
    shoppoints: ShopPoint[]
}

export const masterdataInitialState: MasterDataState = {
    categories: [],
    subcategories: [],
    brands: [], 
    shoppoints: []
} 

const _masterdataReducer = createReducer(masterdataInitialState,
    on(actions.getAllCategoriesRes, (state, { categories }) => ({
        ...state, 
        categories: [...categories]   
    })),
    on(actions.getAllSubCategoriesRes, (state, { subcategories }) => ({
        ...state, 
        subcategories: [...subcategories]   
    })),
    on(actions.getAllBrandsRes, (state, { brands }) => ({
        ...state, 
        brands: [...brands]   
    })),
    on(actions.getAllShopPointsRes, (state, { shoppoints }) => ({
        ...state, 
        shoppoints: [...shoppoints]   
    })),
);

export function masterdataReducer(state: any, action: any){
    return _masterdataReducer(state, action);
}