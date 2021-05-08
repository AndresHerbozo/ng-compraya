import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as actions from '../../../core/store/actions';
import { AppState } from '../../../core/store/app.reducers';
import { Product } from '../../../core/models/response/product.model';
import { ProductOrder } from '../../../core/models/request/product-order.model';

import { Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, AfterContentInit, AfterContentChecked, OnDestroy {
  private baseProducts: Product[] = [];
  public products: Product[] = [];
  public productSelect: Product;
  public sortOptions: SelectItem[] = [];
  public sortOrder: number = 0;
  public sortField: string = '';
  public visibleFilters: boolean = false;
  public isLoading: boolean = true;
  public displayProductConfirm: boolean = false;
  public modalProductId: number;
  public modalProductName: string = '';
  public modalProductImage: string = '';
  public modalProductDescription: string = '';
  public modalProductPrice: string = '';
  public modalCounterOrderValue: number;
  public counterOrderBags: number = 0;
  public templateSkeleton: number[] = [1,2,3,4]
  public modalCounterOrder = new FormControl('');
  private productsSubs: Subscription;
  private modalCounterOrderSubs: Subscription;
  private counterOrderBagsSubs: Subscription;

  constructor(private router: Router, private store: Store<AppState>, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price Alto a Bajo', value: '!item' },
      { label: 'Price Bajo a Alto', value: 'item' }
    ];

    this.store.dispatch(actions.getAllProductReq());
  }

  ngAfterContentInit(): void {
    this.productsSubs = this.store.select('products').subscribe(({ products }) => {
      this.baseProducts = [...products];
      this.products = [...products];

      let loading = (products.length > 0 ? false: true);
      if (loading == false) {
        setTimeout(() => {
          this.isLoading = false;
        }, 100);
      } 
    });

    this.modalCounterOrderSubs = this.modalCounterOrder.valueChanges.subscribe(value => {
      this.modalCounterOrderValue = value;
    });

    this.counterOrderBagsSubs = this.store.select('products').subscribe(({ countOrder }) => {
      this.counterOrderBags = countOrder;
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
    this.productsSubs?.unsubscribe();
    this.modalCounterOrderSubs?.unsubscribe();
    this.counterOrderBagsSubs?.unsubscribe();
    this.store.dispatch(actions.getAllProductClean());
  }

  onSortChange(event: any): void {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      let descendOrder = [...this.products].sort((a, b) => parseFloat(b.priceExtract) - parseFloat(a.priceExtract));
      this.products = descendOrder;
    }
    else {
      let ascendOrder = this.products.sort((a, b) => parseFloat(a.priceExtract) - parseFloat(b.priceExtract));
      this.products = ascendOrder;
    }
  }

  onLaunchFilters(): void {
    this.visibleFilters = !this.visibleFilters;
  }

  onFilterSearch(event): void {
    this.products = [];
    this.isLoading = true;
    let categoryValue: number = (event['categoria'] != '' ? event['categoria']['idCategory'] : null);
    let subCategoryValue: number = (event['subcategoria'] != '' ? event['subcategoria']['idSubCategory'] : null);
    let brandValue: number = (event['marca'] != '' ? event['marca']['idBrand'] : null);
    let priceValue: number[] = event['precio'];
    this.products = this.baseProducts;
    let filter: Product[] = [];

    filter = [...this.products].filter(x => x.idCategory == (categoryValue != null ? categoryValue : x.idCategory));
    filter = [...filter].filter(x => x.subCategoryId == (subCategoryValue != null ? subCategoryValue : x.subCategoryId));
    filter = [...filter].filter(x => x.brandId == (brandValue != null ? brandValue : x.brandId));
    filter = [...filter].filter(x => parseFloat(x.priceExtract) >= priceValue[0] && parseFloat(x.priceExtract) <= priceValue[1]);

    this.products = filter;

    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }

  showConfirmProduct(id: number): void {
    this.productSelect = [...this.products].filter(x => x.productId == id)[0];
    this.modalProductId = this.productSelect.productId;
    this.modalProductName = `${this.productSelect.name} ${this.productSelect.detail}`;
    this.modalProductImage = this.productSelect.image;
    this.modalProductDescription = this.productSelect.description;
    this.modalProductPrice = this.productSelect.priceExtract;
    this.displayProductConfirm = true;
  }

  onAddToShoppingBag(): void {
    let countProduct = this.modalCounterOrderValue;

    if (countProduct!= undefined && countProduct != 0) {
      let countOrder = this.counterOrderBags + 1;
      let priceTotal = parseFloat(this.productSelect.price.price) * countProduct;
      let listOrder: ProductOrder = new ProductOrder(this.productSelect.productId, this.productSelect.name, this.productSelect.detail, countProduct, this.productSelect.image, priceTotal);

      this.store.dispatch(actions.productOrderReq({ listOrder }));
      this.store.dispatch(actions.getCountOrders({ countOrder }));

      this.displayProductConfirm = false;

      Swal.fire({
        icon: 'success',
        title: `Se agregó ${countProduct} ${this.productSelect.name} a la bolsa`,
        showDenyButton: true,
        confirmButtonText: `Ir a la bolsa`,
        denyButtonText: `Seguir comprando`,
        allowOutsideClick: false,
        heightAuto: false
      }).then((result) => {
        this.modalCounterOrder.setValue(0);
        if (result.isConfirmed) {
          this.router.navigate(['/productos/shopbag']);
        } else if (result.isDenied) {
        }
      });
    }

  }

  onClickDetail(value: number): void {
    this.router.navigate([`/productos/detail/${value}`]);
  }
}
