import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.reducers';

import { Subscription } from 'rxjs';

@Component({
  selector: 'cy-header',
  templateUrl: './cy-header.component.html',
  styleUrls: ['cy-header.component.scss']
})
export class CyHeaderComponent implements OnInit, OnDestroy {
  public countOrders: string = '';
  private countOrdersSubs: Subscription; 

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.countOrdersSubs = this.store.select('products').subscribe(({ countOrder }) => {
      this.countOrders = countOrder.toString();
    });
  }

  ngOnDestroy(): void {
    this.countOrdersSubs?.unsubscribe();
  }

  onLaunchShopBag(): void {
    if (parseInt(this.countOrders) >= 1) {
      this.router.navigate(['/productos/shopbag']);
    }
  }
}
