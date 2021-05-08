import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/order.actions';
import { ProductOrder } from '../../models/request/product-order.model';
import { OrderConfirm } from '../../models/response/order-confirm.model';

export interface OrderState {
    listOrder: ProductOrder[],
    orderConfirm: OrderConfirm
}

export const orderInitialState: OrderState = {
    listOrder: [],
    orderConfirm: null
}

const _orderReducer = createReducer(orderInitialState,
    on(actions.productOrderReq, (state, { listOrder }) => ({
        ...state,
        listOrder: [...state.listOrder, listOrder]
    })),
    on(actions.orderBagsRes, (state, { orderConfirm }) => ({
        ...state,
        orderConfirm: orderConfirm
    })),
    on(actions.orderBagsClean, (state) => ({
        ...state,
        listOrder: [],
        orderConfirm: null
    })),
);

export function orderReducer(state: any, action: any) {
    return _orderReducer(state, action)
}