import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
    general: reducers.GeneralState,
    masterdata: reducers.MasterDataState;
    products: reducers.ProductState;
    orders: reducers.OrderState;
}

export const appReducers: ActionReducerMap<AppState> = {
    general: reducers.generalReducer,
    masterdata: reducers.masterdataReducer,
    products: reducers.productReducer,
    orders: reducers.orderReducer
}