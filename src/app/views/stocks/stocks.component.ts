import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { egidTaskAnimations } from 'src/app/shared/animations/egidtask-animations';
import { AppLoaderService } from 'src/app/shared/services/app-loader/app-loader.service';
import { BaseService } from 'src/app/shared/services/baseService';
import { ResponseStatus } from 'src/app/shared/Enum/response-status';
import { StockService } from 'src/app/shared/services/orders/stock.service';
import { GetStocksCriteria } from 'src/app/shared/criteria/orders/get-stocks-criteria';
import { GetStocksResponse } from 'src/app/shared/response/orders/get-stocks-response';
import { Stock } from 'src/app/shared/models/orders/stock';
import { BaseResponseT } from 'src/app/shared/response/base-response-t';
import { SignalRService } from 'src/app/shared/services/signal-r/signal-r.service';
import { HubConnectionState } from '@microsoft/signalr';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
  animations: egidTaskAnimations
})
export class StocksComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any

  public dataSource: any;
  public displayedColumns: any;
  public PagingEnabled = true;
  public PageNumber = 0;
  public PageSize = 5;
  public totalSize: any;
  public lang: string | any;
  private hubConnection: signalR.HubConnection | any;

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private signalRService: SignalRService,
    private loader: AppLoaderService,
    private stockService: StockService,
    private toastr: ToastrService,
    private baseServes: BaseService
  ) { }

  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.GetStocks();

    if (!localStorage.getItem('Lang')) { localStorage.setItem('lang', 'ar') };
    this.lang = localStorage.getItem("Lang") || "ar";

    if (this.signalRService?.hubConnection?.state != HubConnectionState.Connected) {
      this.signalRService.StartSignalRConnection();
      this.signalRService.SignalRConnectionStartedSubject.subscribe(hubConnection => {

        this.hubConnection = this.signalRService.JoinGroup();
        this.HandleNewPricesUpdateOperation();

      });
    } else {
      this.HandleNewPricesUpdateOperation();
    }
  }

  public HandleNewPricesUpdateOperation = () => {
    this.hubConnection.on("NewStocksPrices", (NewStocksPricesModel: any) => {
      this.GetStocks();
    });
  }

  ngAfterViewInit() {

    this.handleData();

  }

  handleData() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getDisplayedColumns() {
    return ['name', 'price'];
  }

  public getPaginatorData(event: PageEvent) {

    this.PageNumber = event.pageIndex;
    this.PageSize = event.pageSize;
    this.GetStocks();
  }

  GetStocks() {

    // this.loader.open("Load Stocks");

    let criteria: GetStocksCriteria = new GetStocksCriteria();
    criteria.PagingEnabled = this.PagingEnabled;
    criteria.PageNumber = this.PageNumber;
    criteria.PageSize = this.PageSize;
    debugger
    this.stockService
      .GetStocks(criteria)
      .subscribe((response: BaseResponseT<Stock[]>) => {
        if (response && response.state == ResponseStatus.Success) {
          this.dataSource = new MatTableDataSource(response.data);
          this.totalSize = response.totalCount;
        }
        //this.loader.close();
      });
  }




}
