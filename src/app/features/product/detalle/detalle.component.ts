import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';


import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.reducers';
import * as actions from '../../../core/store/actions';
import { Product } from '../../../core/models/response/product.model';
import { ProductOrder } from '../../../core/models/request/product-order.model';

import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit, AfterContentInit, AfterViewInit, AfterContentChecked, OnDestroy {

  private idProduct: number;
  public details: Product;
  public items: MenuItem[];
  public home: MenuItem;
  private detailSubs: Subscription;

  public images: any[] = [];
  public responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  public counterOrder = new FormControl('');
  public counterOrderValue: number;
  public counterOrderBags: number = 0;
  private counterOrderValueSubs: Subscription;
  private counterOrderBagsSubs: Subscription;

  constructor(private store: Store<AppState>, private activedRouter: ActivatedRoute, private cdref: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.details = null;
    this.idProduct = this.activedRouter.snapshot.params.id;
    this.store.dispatch(actions.getProductDetailReq({ id: this.idProduct }));
  }

  ngAfterContentInit(): void {
    this.detailSubs = this.store.select('products').subscribe(({ product }) => {
      this.details = product;
      this.images = [];

      if (this.details != null) {
        this.images.push(
          {
            "previewImageSrc": this.details.image,
            "thumbnailImageSrc": this.details.image,
            "alt": this.details.name,
            "title": this.details.name
          }
        );

        this.items = [
          { label: 'Productos' },
          { label: this.details.category.name },
          { label: this.details.subCategory.name },
          { label: this.details.brand.name },
          { label: this.details.name }
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
      }
    });

    this.counterOrderBagsSubs = this.store.select('products').subscribe(({ countOrder }) => {
      this.counterOrderBags = countOrder;
    });
  }

  ngAfterViewInit(): void {
    this.counterOrderValueSubs = this.counterOrder.valueChanges.subscribe(value => {
      this.counterOrderValue = value;
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
    this.detailSubs?.unsubscribe();
    this.counterOrderValueSubs?.unsubscribe();
    this.counterOrderBagsSubs?.unsubscribe();
    this.store.dispatch(actions.getProductDetailClean());
  }

  onAddToShoppingBag(): void {
    let countProduct = this.counterOrderValue;

    if (countProduct!= undefined && countProduct != 0) {
      let countOrder = this.counterOrderBags + 1;
      let priceTotal = parseFloat(this.details.price.price) * countProduct;
      let listOrder: ProductOrder = new ProductOrder(this.details.productId, this.details.name, this.details.detail, countProduct, this.details.image, priceTotal);

      this.store.dispatch(actions.productOrderReq({ listOrder }));
      this.store.dispatch(actions.getCountOrders({ countOrder }));

      Swal.fire({
        icon: 'success',
        title: `Se agregó ${countProduct} ${this.details.name} a la bolsa`,
        showDenyButton: true,
        confirmButtonText: `Ir a la bolsa`,
        denyButtonText: `Seguir comprando`,
        allowOutsideClick: false,
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/productos/shopbag']);
        } else if (result.isDenied) {
          this.router.navigate(['']);
        }
      });
    }
  }
}
