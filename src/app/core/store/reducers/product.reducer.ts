import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/response/product.model';
import * as actions from '../actions';

export interface ProductState {
    products: Product[],
    product: Product,
    countOrder: number
}

export const productInitialState: ProductState = {
    products: [],
    product: null,
    countOrder: 0
}

const _productReducer = createReducer(productInitialState,
    on(actions.getAllProductRes, (state, { products }) => ({
        ...state,
        products: [...products]
    })),
    on(actions.getAllProductClean, (state) => ({
        ...state,
        products: []
    })),
    on(actions.getProductDetailRes, (state, { product }) => ({
       ...state, 
       product: product 
    })),
    on(actions.getProductDetailClean, (state) => ({
       ...state, 
       product: null 
    })),
    on(actions.getCountOrders, (state, { countOrder }) => ({
        ...state,
        countOrder: countOrder
    }))
); 

export function productReducer(state: any, action: any) {
    return _productReducer(state, action)
}