import { createAction, props } from '@ngrx/store';

import { Order } from '../../models/request/order.mode';
import { ProductOrder } from '../../models/request/product-order.model';
import { OrderConfirm } from '../../models/response/order-confirm.model';

export const productOrderReq = createAction(
    '[Product Shop Bag] Set Product Bag Req',
    props<{ listOrder: ProductOrder }>()
);

export const orderBagsReq = createAction(
    '[Shopping Bag] Order Confirm Req',
    props<{ order: Order }>()
);

export const orderBagsRes = createAction(
    '[Shopping Bag] Order Confirm Res',
    props<{ orderConfirm: OrderConfirm }>()
);

export const orderBagsClean = createAction(
    '[Shopping Bag] Order Confirm Clean',
);