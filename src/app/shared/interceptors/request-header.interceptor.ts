import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "../services/baseService";

@Injectable()
export class RequestHeaderInterceptor implements HttpInterceptor {

  constructor(public baseService: BaseService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    var changedReq;

    if (true/*token*/) {

      changedReq = req.clone({
        setHeaders: {
          Lang: this.baseService.lang,
          'Content-Type': 'application/json',
          Accept: "application/json",
          'Accept-Language': this.baseService.lang,
          //'Access-Control-Allow-Headers': '*',
          //'Access-Control-Allow-Origin': '*'
        },
      });

    } else {
      changedReq = req;
    }
    return next.handle(changedReq);
  }
}
