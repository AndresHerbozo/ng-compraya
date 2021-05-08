import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../../core/core.module';

import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { GalleriaModule } from 'primeng/galleria';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderListModule } from 'primeng/orderlist';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';

import { ListadoComponent } from './listado/listado.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ShopbagComponent } from './shopbag/shopbag.component';

export const routes: Routes = [
  {
    path: '',
    component: ListadoComponent,
  },
  {
    path: 'detail/:id',
    component: DetalleComponent
  },
  {
    path: 'shopbag',
    component: ShopbagComponent
  }
]
@NgModule({
  declarations: [
    ListadoComponent,
    FiltrosComponent,
    DetalleComponent,
    ShopbagComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild(routes),
    DataViewModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    SliderModule,
    GalleriaModule,
    BreadcrumbModule,
    InputNumberModule,
    OrderListModule,
    DialogModule,
    SkeletonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
