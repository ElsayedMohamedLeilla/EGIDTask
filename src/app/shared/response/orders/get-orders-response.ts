import { Order } from "../../models/orders/order";
import { BaseResponse } from "../base-response";

export class GetOrdersResponse extends BaseResponse {
  public Orders: Order[] | undefined;
}
