import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/response/product.model';

export const getAllProductReq = createAction(
    '[Product] Get All Product Collection Req'
);

export const getAllProductRes = createAction(
    '[Product] Get All Product Collection Res',
    props<{ products: Product[] }>()
);

export const getAllProductClean = createAction(
    '[Product] Get All Product Collection Clean',
);

export const getProductDetailReq = createAction(
    '[Product Detail] Get Detail Req',
    props<{ id: number }>()
); 

export const getProductDetailRes = createAction(
    '[Product Detail] Get Detail Res',
    props<{ product: Product }>()
);

export const getProductDetailClean = createAction(
    '[Product Detail] Get Detail Clean',
);

export const getCountOrders = createAction(
    '[Product Order] Get Count Orders',
    props<{ countOrder: number }>()
);