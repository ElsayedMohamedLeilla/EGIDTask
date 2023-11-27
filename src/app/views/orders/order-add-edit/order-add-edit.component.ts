import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetStocksCriteria } from 'src/app/shared/criteria/orders/get-stocks-criteria';
import { Stock } from 'src/app/shared/models/orders/stock';
import { Order } from 'src/app/shared/models/orders/order';
import { OrderService } from 'src/app/shared/services/orders/order.service';
import { StockService } from 'src/app/shared/services/orders/stock.service';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'src/app/shared/services/app-loader/app-loader.service';
import { BaseResponseT } from 'src/app/shared/response/base-response-t';
import { ResponseStatus } from 'src/app/shared/Enum/response-status';

@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html'
})
export class OrderAddEditComponent implements OnInit {
  public orderForm: UntypedFormGroup | any;
  @ViewChild(MatButton) submitButton: MatButton | any;

  public controlStock: FormControl = new FormControl();
  public controlCurrency: FormControl = new FormControl();
  public stocks: Stock[] | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrderAddEditComponent>,
    public toastr: ToastrService,
    private orderService: OrderService,
    private fb: UntypedFormBuilder,
    private stockService: StockService,
    private snack: MatSnackBar,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {

    this.GetStocks();
    this.buildItemForm(this.data.payload)
  }

  buildItemForm(order: Order) {
    this.orderForm = this.fb.group({
      StockId: [order?.StockId || null, Validators.required],
      PersonName: [order?.PersonName || '', Validators.required],
      Quantity: [order?.Quantity || null, Validators.required]
    })

  }

  submit() {
    if (this.data.Create) {
      this.CreateOrder();
    } else {

    }
  }

  CreateOrder() {

    let order: Order = this.orderForm.value;
    this.submitButton.disabled = true;
    this.loader.open("Adding New Order");
    this.orderService
      .CreateOrder(order)
      .subscribe((response: BaseResponseT<number>) => {
        if (response && response.state == ResponseStatus.Success) {
          this.toastr.success(response.message, response.message);
          this.snack.open("Done Add Order Successfully",
            "Ok", { duration: 4000 });
          this.dialogRef.close();
        }
        this.submitButton.disabled = false;
        this.loader.close();
      });
  }

  GetStocks() {

    const criteria: GetStocksCriteria = new GetStocksCriteria();
    criteria.PagingEnabled = true;
    criteria.PageSize = 5;
    criteria.PageNumber = 0;

    this.stockService
      .GetStocks(criteria)
      .subscribe((response: BaseResponseT<Stock[]>) => {
        if (response && response.state == ResponseStatus.Success) {
          this.stocks = response.data;
        }
      });
  }
}
