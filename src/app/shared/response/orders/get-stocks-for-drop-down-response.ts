import { Stock } from "../../models/orders/stock";
import { BaseResponse } from "../base-response";

export class GetStocksForDropDownResponse extends BaseResponse {
  public Stocks: Stock[] | undefined;
}
