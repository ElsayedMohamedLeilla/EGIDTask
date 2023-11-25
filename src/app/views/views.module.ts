import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { OrdersComponent } from './orders/orders.component';
import { OrderAddEditComponent } from './orders/order-add-edit/order-add-edit.component';
import { SharedModule } from '../shared/shared.module';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { OrderService } from '../shared/services/orders/order.service';
import { StockService } from '../shared/services/orders/stock.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppLoaderComponent } from '../shared/services/app-loader/app-loader.component';
import { routes } from './views.routing';
import { HttpClientModule } from '@angular/common/http';
import { StocksComponent } from './stocks/stocks.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatChipsModule,
    HttpClientModule,
    MatListModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    //TranslateModule,
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),
    NgxMatSelectSearchModule
  ],
  declarations: [OrdersComponent, OrderAddEditComponent,AppLoaderComponent,StocksComponent],
  providers: [OrderService, StockService,
 {
      provide: MatPaginatorIntl,
      //deps: [TranslateService]
    }]
})
export class ViewsModule { }
