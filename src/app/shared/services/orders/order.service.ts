import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';
//import { environment } from 'environments/environment';
import { GetOrdersCriteria } from 'src/app/shared/criteria/orders/get-orders-criteria';
import { GetOrdersResponse } from 'src/app/shared/response/orders/get-orders-response';
import { environment } from 'src/environments/environment';
import { BaseService } from '../baseService';
import { Order } from '../../models/orders/order';
import { CreateOrderModel } from '../../models/orders/create-order-model';
import { BaseResponseT } from '../../response/base-response-t';


@Injectable()
export class OrderService {
  constructor(
    private http: HttpClient,
    private baseService: BaseService,
  ) {
  }


  public GetOrders(criteria: GetOrdersCriteria) {

    return this.http.get(`${environment.apiURL}/Order/Get`,
      {
        headers: this.baseService.getHeaders().headers,
        params: this.baseService.ToHttpParams(criteria)
      })
      .pipe(
        map((res: Observable<GetOrdersResponse> | any) => {
          this.baseService.ValidationResult(res);
          return res;
        }),
        catchError(this.baseService.handleError<GetOrdersResponse>('Orders'))
      );

  }

  public CreateOrder(model: CreateOrderModel) {

    return this.http.post(`${environment.apiURL}/Order/Create`, model)
      .pipe(
        map((res: Observable<BaseResponseT<boolean>> | any) => {
          this.baseService.ValidationResult(res);
          return res;
        }),
        catchError(this.baseService.handleError<BaseResponseT<boolean>>('Created'))
      );

  }

}
