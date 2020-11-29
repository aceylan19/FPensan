import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Enums} from '../models/enums/enums';
import {ErrorManagementService} from './error/error-management.service';
import {BaseMethodsService} from './base/base-methods.service';
import {ManagementService} from './management/management.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceConnectionsService {
  private headers: {};

  constructor(private http: HttpClient, private baseMethodsSerive: BaseMethodsService) {
  }

  sendingParams = {};


  serviceConnection(methodUrl, params, methodType) {
    this.headers = {};
    if (this.baseMethodsSerive.getHandleStorageData('token') != null) {
      // @ts-ignore
      this.headers.Token = this.baseMethodsSerive.getHandleStorageData('token');
    }

    if (params != null) {
      this.sendingParams = JSON.stringify(params);
    }
    if (this.baseMethodsSerive._pageNo != null && params != null) {
      const p = {
        RequestParams: params,
        PageNo: this.baseMethodsSerive._pageNo
      };
      this.baseMethodsSerive.setHandleStorageData('requestParams', JSON.stringify(p));
    }
    if (methodType === Enums.MethodType.POST) {
      var data = this.http.post(methodUrl, this.sendingParams, {headers: this.headers});
      return data;
    } else if (methodType === Enums.MethodType.GET) {
      var data = this.http.get(methodUrl, {headers: this.headers});
      return data;
    } else if (methodType === Enums.MethodType.DELETE) {
      var data = this.http.delete(methodUrl, {headers: this.headers});
      return data;
    }

  }

  parseData = function(data) {
    var data = JSON.parse(data.Data);
    return data;
  };

  //-- Records parse
  parseDataToJsonList = function(data) {
    if (data.Data != null) {
      var data = JSON.parse(data.Data);
      return data.Records;
    }
  };
  parseDataToJsonDetails = function(data) {
    var data = JSON.parse(data.Data);
    return data;
  };
  parseRecordsToList = function(data) {
    return data.Records;
  };
  parseRecordsToDetails = function(data) {
    if (data.Records != null) {
      return data.Records[0];
    }
  };
  //--
}
