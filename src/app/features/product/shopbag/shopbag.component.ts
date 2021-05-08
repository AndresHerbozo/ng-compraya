import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.reducers';
import * as actions from '../../../core/store/actions';
import { ProductOrder } from '../../../core/models/request/product-order.model';
import { ShopPoint } from '../../../core/models/response/shop-point.model';
import { Order } from '../../../core/models/request/order.mode';

import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopbag',
  templateUrl: './shopbag.component.html',
  styleUrls: ['./shopbag.component.scss']
})
export class ShopbagComponent implements OnInit, AfterContentInit, AfterContentChecked, OnDestroy {
  public shopBagsForm: FormGroup;
  public listOrders: ProductOrder[] = [];
  public shopPoints: ShopPoint[] = [];
  public items: MenuItem[];
  public home: MenuItem;
  public shopPointSelect: string = '';
  public itemsConfirmed: number[] = [];
  public countConfirm: number = 0;
  private listOrdersSubs: Subscription;
  private shopPointsSubs: Subscription;
  private confirmOrdersSubs: Subscription;

  constructor(private store: Store<AppState>, private router: Router, private cdref: ChangeDetectorRef, private fb: FormBuilder) {
    this.shopBagsForm = this.fb.group({
      nameClient: ['', Validators.required],
      lastFatherNameClient: ['', Validators.required],
      lastMotherNameClient: ['', Validators.required],
      documentClient: ['', Validators.required],
      favoriteShopPoint: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Productos' },
      { label: 'Bolsa de Compras' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.store.dispatch(actions.getAllShopPointsReq());
  }

  ngAfterContentInit(): void {
    this.listOrdersSubs = this.store.select('orders').subscribe(({ listOrder }) => {
      this.listOrders = listOrder;
    });

    this.shopPointsSubs = this.store.select('masterdata').subscribe(({ shoppoints }) => {
      this.shopPoints = shoppoints;
    });

    this.confirmOrdersSubs = this.store.select('orders').subscribe(({ orderConfirm }) => {
      debugger;
      if (orderConfirm != undefined && orderConfirm != null) {
        let orderConfirmed = orderConfirm.idProduct;

        if (this.itemsConfirmed.indexOf(orderConfirmed) === -1) {
          this.itemsConfirmed.push(orderConfirmed);
          this.countConfirm += 1;
        }

        if (this.countConfirm == this.listOrders.length) {
          let today: Date = new Date();
          let lastConfirmCode: string = `${orderConfirm.dni}-${today.getDate()}${today.getMonth()}${today.getFullYear()}${today.getHours()}${today.getMinutes()}`;

          Swal.fire({
            icon: 'success',
            title: `Pedido Confirmado!`,
            text: `Codigo: ${lastConfirmCode}. Tiene 2 días habiles para recoger su pedido en ${this.shopPointSelect} de 9:00 am a 8:30 pm.`,
            showDenyButton: false,
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
            heightAuto: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.store.dispatch(actions.getCountOrders({ countOrder: 0 }));
              this.store.dispatch(actions.orderBagsClean());
              this.router.navigate(['']);
            }
          });
        }
      }
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
    this.listOrdersSubs?.unsubscribe();
    this.shopPointsSubs?.unsubscribe();
    this.confirmOrdersSubs?.unsubscribe();
  }

  onSaveOrder(): void {
    const { nameClient, lastFatherNameClient, lastMotherNameClient, documentClient, favoriteShopPoint } = this.shopBagsForm.value;

    if (nameClient != '' && lastFatherNameClient != '' && lastMotherNameClient != '' && documentClient != ''
      && favoriteShopPoint != undefined && favoriteShopPoint != null) {
      Swal.fire({
        icon: 'question',
        title: `Confirmación de Pedido`,
        text: '¿Está seguro de confimar?',
        showDenyButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: 'No',
        allowOutsideClick: false,
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.onProcessOrder();
        } else if (result.isDenied) {
        }
      });
    }
  }

  onProcessOrder(): void {
    Swal.fire({
      title: 'Procesando Pedido...',
      allowOutsideClick: false,
      heightAuto: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { nameClient, lastFatherNameClient, lastMotherNameClient, documentClient, favoriteShopPoint } = this.shopBagsForm.value;
    this.shopPointSelect = favoriteShopPoint['name'];

    this.listOrders.forEach((item, i) => {
      let order: Order = new Order(item.idProduct, item.count, nameClient, lastFatherNameClient, lastMotherNameClient, parseInt(documentClient), parseInt(favoriteShopPoint['idStore']));
      this.store.dispatch(actions.orderBagsReq({ order }));
    });
  }
}
