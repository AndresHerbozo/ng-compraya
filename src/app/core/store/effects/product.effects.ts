import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import * as actions from '../actions';
import { map, mergeMap } from 'rxjs/operators';
import { Product } from '../../models/response/product.model';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) { }

    getAllProducts$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(actions.getAllProductReq),
                mergeMap(
                    () => this.productService.getProductsAll()
                        .pipe(
                            map((products: Product[]) => actions.getAllProductRes({ products: [...products] }))
                        )
                )
            )
    );

    getProductDetail$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(actions.getProductDetailReq),
                mergeMap(
                    param => this.productService.getProductDetail(param.id)
                        .pipe(
                            map((product: Product) => actions.getProductDetailRes({ product }))
                        )
                )
            )
    )
}