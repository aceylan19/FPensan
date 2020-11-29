import {Injectable} from '@angular/core';
import {Consts} from '../../models/consts/consts';
import {HttpClient} from '@angular/common/http';
import {ServiceConnectionsService} from '../service-connections.service';
import {Enums} from '../../models/enums/enums';
import {BaseMethodsService} from '../base/base-methods.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private headers: { Token: string };

  constructor(private http: HttpClient, private serviceConnectionService: ServiceConnectionsService,
              private baseMethodsSerive: BaseMethodsService) {
  }

  serviceBaseUrl = Consts.protocol + Consts.apiPath + Consts.general;

  uploadFile(form, params) {
    this.headers = {
      'Token': this.baseMethodsSerive.getHandleStorageData('token')
    };
    let methodUrl = this.serviceBaseUrl + Consts.uploadFile + '?1=1';
    if (params.FileTypeId != null) {
      methodUrl += '&c0=' + params.FileTypeId;
    }
    if (params.RecordId != null) {
      methodUrl += '&c1=' + params.RecordId;
    }
    if (params.ProductClassId != null) {
      methodUrl += '&c2=' + params.ProductClassId;
    };
    alert(methodUrl);
    return this.http.post(methodUrl, form, {headers: this.headers});
  };

  deleteRecordFile(params) {
    const methodUrl = this.serviceBaseUrl + Consts.deleteRecordFile + '/' + params.FileId;

    return this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.DELETE);
  };

  getExcelFileFromJSON(params) {
    const methodUrl = this.serviceBaseUrl + Consts.getExcelFileFromJSON;
    return this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST);
  };

  getRecordCommentList(params) {
    const methodUrl = this.serviceBaseUrl + Consts.getRecordCommentList + '/' + params.Id;
    return this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET);
  }

  setRecordCommet(params) {
    const methodUrl = this.serviceBaseUrl + Consts.setRecordComment;
    return this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST);
  }
}
