import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Injectable } from "@angular/core";
import { UXErrors } from "../models/Helpers/helpers";
import { ResponseStatus } from "../Enum/response-status";
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root",
})
export class BaseService {

  private dataStore: object | any = {};
  public lang: string = "ar";
  AuditObj: any = {};

  constructor(
    private toastr: ToastrService
  ) {

  }

  public pageSizeOptions: number[] = [5, 10, 50];


  ValidationResult(executionResponse: any) {
    debugger

    if (executionResponse.state == ResponseStatus.ValidationError) {
      var mess = "";
      if (executionResponse.validationResult && executionResponse.validationResult.errors) {
        for (let error of executionResponse.validationResult.errors) {
          mess = mess + error["<ErrorMessage>k__BackingField"] + " ";
        }
      }

      if (executionResponse.detailedMessages && executionResponse.detailedMessages.length > 0) {
        let messageLen = executionResponse.detailedMessages.length;
        for (let error of executionResponse.detailedMessages) {
          if (error.Property != '' && error.Property != null) {
            // this.getTranslation(error.Property).subscribe(t => {
            //     mess = mess + t + "\n";
            //     // this.toastr.error(mess);
            // });

            mess += error.MetaPlus + error.Meta + "\n";

          } else {
            // mess = mess + error.Meta + "\n";
            mess += error.MetaPlus + error.Meta + "\n";

          }
        }
        if (messageLen > 0)
          this.toastr.error(mess);
      }
      else {
        if (executionResponse.Message) {
          this.toastr.error(executionResponse.Message);
        }
        else if (mess) {
          this.toastr.error(mess);
        }
      }
      // this.toastr.error(mess);
    } else if (executionResponse.Status == ResponseStatus.UnAuthorized) {




    }
    if (executionResponse.Status == ResponseStatus.Error) {
      this.toastr.error(UXErrors(executionResponse));
    }

  }



  public getDataFromStore(key: string): any {
    if (this.dataStore[key] && key != "lang") {
      return this.dataStore[key];
    }
    this.dataStore[key] = this.getLocalStorageItemByKey(key);
    return this.dataStore[key];
  }

  public setDataIntoStore(key: string, data: any): void {
    this.dataStore[key] = data;
    this.setLocalStorageItemByKey(key, data);
  }

  private getLocalStorageItemByKey(key: string) {
    let item = localStorage.getItem(key);
    if (item && item != 'undefined' && item != 'null') {
      return item.startsWith('{') || item.startsWith('[')
        ? JSON.parse(item)
        : item;
    }
    return null;
  }



  private setLocalStorageItemByKey(key: string, value: any) {
    let item = typeof value == 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, item);
  }

  handleError<T>(operation = 'operation', result?: T) {
debugger
    return (error: any): Observable<T> => {
      this.toastr.error(UXErrors(error));
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }




  public getHeaders() {


    return {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept-Language', "en")
        .set('DEVICETYPE', 'Branch')
        .set("Access-Control-Allow-Headers", "*")
    }
  }

  public ToHttpParams(request: any): HttpParams {
    let httpParams = new HttpParams();

    if (request) {
      Object.keys(request).forEach(function (key) {
        if (request[key] != null) {
          httpParams = httpParams.append(key, request[key]);
        }
      });
    }

    return httpParams;
  }


}


export const LocalStorageKeys = {
  COUNTRYID: 'countryId',
  COUNTRYNAME: 'countryName',
  CITYID: 'cityId',
  CITYNAME: 'cityName',
  TOKENOBJECT: 'tokenObject',
  COUNTRY: 'country',
  LANG: 'lang',
  GlameraResources: 'glameraResources',
  DROPDOWN: 'dropdown',
  GLAMERABLOG: 'GlameraBlog',
  USERIDENTITY: 'UserIdentity',
};





