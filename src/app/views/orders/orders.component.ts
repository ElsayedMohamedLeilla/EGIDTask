import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { GetOrdersCriteria } from 'src/app/shared/criteria/orders/get-orders-criteria';
import { OrderService } from 'src/app/shared/services/orders/order.service';
import { GetOrdersResponse } from 'src/app/shared/response/orders/get-orders-response';
import { egidTaskAnimations } from 'src/app/shared/animations/egidtask-animations';
import { AppLoaderService } from 'src/app/shared/services/app-loader/app-loader.service';
import { BaseService } from 'src/app/shared/services/baseService';
import { ResponseStatus } from 'src/app/shared/Enum/response-status';
import { OrderAddEditComponent } from './order-add-edit/order-add-edit.component';
import { BaseResponseT } from 'src/app/shared/response/base-response-t';
import { Order } from 'src/app/shared/models/orders/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: egidTaskAnimations
})
export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any

  public dataSource: any;
  public displayedColumns: any;
  public PagingEnabled = true;
  public PageNumber = 0;
  public PageSize = 5;
  public totalSize: any;
  public lang: string | any;


  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private baseServes: BaseService
  ) { }

  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.GetOrders();

    if (!localStorage.getItem('Lang')) { localStorage.setItem('lang', 'ar') };
    this.lang = localStorage.getItem("Lang") || "ar";
  }
  ngAfterViewInit() {

    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }

  getDisplayedColumns() {
    return ['personName', 'stockName', 'quantity', 'price'];
  }

  public getPaginatorData(event: PageEvent) {

    this.PageNumber = event.pageIndex;
    this.PageSize = event.pageSize;
    this.GetOrders();
  }

  GetOrders() {

    this.loader.open("Load Orders");

    let criteria: GetOrdersCriteria = new GetOrdersCriteria();
    criteria.PagingEnabled = this.PagingEnabled;
    criteria.PageNumber = this.PageNumber;
    criteria.PageSize = this.PageSize;

    this.orderService
      .GetOrders(criteria)
      .subscribe((response: BaseResponseT<Order[]>) => {
        if (response && response.state == ResponseStatus.Success) {
          this.dataSource = new MatTableDataSource(response.data);
          this.totalSize = response.totalCount;
        }
        this.loader.close();
      });
  }

  Add() {
    this.openAddUpdatePopUp(null, true);
  }

  openAddUpdatePopUp(data: any = {}, isNew?: any) {
    let title = isNew ? 'AddOrder' : 'UpdateOrder';
    let dialogRef: MatDialogRef<any> = this.dialog.open(OrderAddEditComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data, Create: isNew }
    })
    dialogRef.afterClosed()
      .subscribe(res => {

        this.GetOrders();
      })
  }

}
