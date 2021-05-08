import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule } from 'primeng/badge';

import { CyHeaderComponent } from './cy-header/cy-header.component';
import { CyFooterComponent } from './cy-footer/cy-footer.component';

@NgModule({
  declarations: [
    CyHeaderComponent,
    CyFooterComponent
  ],
  imports: [
    CommonModule,
    BadgeModule
  ],
  exports: [
    CyHeaderComponent,
    CyFooterComponent
  ]
})
export class SharedModule { }
