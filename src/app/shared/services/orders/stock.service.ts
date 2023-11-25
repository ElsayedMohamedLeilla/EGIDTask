import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseService } from '../baseService';
import { GetStocksCriteria } from '../../criteria/orders/get-stocks-criteria';
import { GetStocksResponse } from '../../response/orders/get-stocks-response';
import { GetStocksForDropDownResponse } from '../../response/orders/get-stocks-for-drop-down-response';
import { BaseResponseT } from '../../response/base-response-t';
import { Stock } from '../../models/orders/stock';


@Injectable()
export class StockService {
  constructor(
    private http: HttpClient,
    private baseService: BaseService,
  ) {
  }


  public GetStocks(criteria: GetStocksCriteria) {

    return this.http.get(`${environment.apiURL}/Stock/Get`,
      {
        headers: this.baseService.getHeaders().headers,
        params: this.baseService.ToHttpParams(criteria)
      })
      .pipe(
        map((res: Observable<BaseResponseT<Stock[]>> | any) => {
          this.baseService.ValidationResult(res);
          return res;
        }),
        catchError(this.baseService.handleError<BaseResponseT<Stock[]>>('Orders'))
      );

  }

  public GetStocksForDropDown(criteria: GetStocksCriteria) {

    return this.http.get(`${environment.apiURL}/Stock/GetForDropDown`,
      {
        headers: this.baseService.getHeaders().headers,
        params: this.baseService.ToHttpParams(criteria)
      })
      .pipe(
        map((res: Observable<GetStocksForDropDownResponse> | any) => {
          this.baseService.ValidationResult(res);
          return res;
        }),
        catchError(this.baseService.handleError<GetStocksForDropDownResponse>('Stocks'))
      );

  }
}
