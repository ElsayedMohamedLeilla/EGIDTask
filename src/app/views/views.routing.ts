import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { NgModule } from '@angular/core';
import { StocksComponent } from './stocks/stocks.component';

export const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    data: { title: 'Orders', breadcrumb: 'Orders' }
  }, {
    path: 'stocks',
    component: StocksComponent,
    data: { title: 'Stocks', breadcrumb: 'Stocks' }
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
