import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '../../services/order.service';
import { orderBagsReq, orderBagsRes } from '../actions/order.actions';
import { mergeMap, map } from 'rxjs/operators';
import { OrderConfirm } from '../../models/response/order-confirm.model';

@Injectable()
export class OrderEffects {
    constructor(private actions$: Actions, private orderService: OrderService) { }

    setOrderConfirm$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(orderBagsReq),
                mergeMap(
                    params => this.orderService.setOrderConfirm(params.order)
                        .pipe(
                            map((orderConfirm: OrderConfirm) => orderBagsRes({ orderConfirm }))
                        )
                )
            )
    )
}