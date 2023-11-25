import { ResponseStatus } from "../Enum/response-status";

export class BaseResponseT<T> {
  public data: T | undefined;
  public totalCount: number | undefined;
  public title: string | undefined;
  public message: string | undefined;
  public state: ResponseStatus = ResponseStatus.Success;
  public exception: any;
}
