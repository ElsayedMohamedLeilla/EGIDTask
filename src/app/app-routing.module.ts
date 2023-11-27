import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './views/stocks/stocks.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule),
    data: { title: 'Stocks', breadcrumb: 'Stocks' }
  },

  {

    path: 'orders',
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule),
    data: { title: 'Orders', breadcrumb: 'Orders' }

  },
  {

    path: 'stocks',
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule),
    data: { title: 'Stocks', breadcrumb: 'Stocks' }

  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
