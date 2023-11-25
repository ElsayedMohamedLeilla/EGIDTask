import { ResponseStatus } from "../Enum/response-status";

export class BaseResponse {
  public TotalCount: number = 0;
  public Message: string | undefined;
  public State: ResponseStatus = ResponseStatus.Success;
  public Exception: any;
}
