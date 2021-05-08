import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/productos',
    pathMatch: 'full'
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./features/product/product.module').then((p) => p.ProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
