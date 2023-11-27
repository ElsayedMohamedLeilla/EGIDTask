import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { HubConnection } from '@microsoft/signalr';
import { BaseService } from '../baseService';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SignalRService extends BaseService {

  private toastr1: ToastrService;
  public hubConnection: signalR.HubConnection | any;
  private SignalRUrl: string;
  public SignalRConnectionStartedSubject = new Subject<HubConnection>();

  constructor(
    _toastr: ToastrService
  ) {
    super(_toastr);
    this.toastr1 = _toastr;

    //super();
    this.SignalRUrl = `${environment.apiURL}` + "/realtime";
    this.SignalRUrl = this.SignalRUrl.replace('api/', '');

  }

  public StartSignalRConnection = (): void => {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(this.SignalRUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
    this.hubConnection.start().then(() => {

      var hubConnectionState = this.hubConnection.state;
      this.SignalRConnectionStartedSubject
        .next(this.hubConnection);

    }).catch((err: any) => {

      console.log(err);

    });

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.SignalRUrl)
      .build();
    this.hubConnection.start().then(() => {

      var hubConnectionState = this.hubConnection.state;
      this.SignalRConnectionStartedSubject
        .next(this.hubConnection);

    }).catch((err: any) => {

      console.log(err);

    });

  }

  public JoinGroup = () => {

    var groupName = "EGIDTask-SignalR";


    this.hubConnection.invoke(
      "JoinGroup",
      groupName)
      .then(() => {
        console.log('Signal R joined signal r company group:' +
          groupName);
      })
      .catch((err: any) => console.log('Error while joining signal r company group: ' + err))

    return this.hubConnection;
  }


  public StopSignalRConnection = () => {

    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => console.log('Signal R connection stoped'))
        .catch((err: any) => console.log('Error while stoping signal r connection: ' + err));
    }

  }

  public LeaveBranchGroup = () => {

    var groupName = "EGIDTask-SignalR";

    this.LeaveGroup(groupName);
  }

  public LeaveGroup = (groupName: string) => {


    this.hubConnection.invoke(
      "LeaveGroup", groupName)
      .then(() => {

        console.log('Signal R leave group :' +
          groupName);
      })
      .catch((err: any) => console.log('Error while leaveing signal r group: '
        + groupName + ' - ' + err))

    return this.hubConnection;
  }

}

