import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {BaseMethodsService} from '../base/base-methods.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RequestModelsService} from '../request-models/request-models.service';
import {ServiceConnectionsService} from '../service-connections.service';
import {Consts} from '../../models/consts/consts';
import {Enums} from '../../models/enums/enums';
import {ErrorManagementService} from '../error/error-management.service';
import {EnumsList} from '../../models/enums/enum-list';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private baseMethodService: BaseMethodsService,
              private http: HttpClient,
              private router: Router,
              private requestModels: RequestModelsService,
              private serviceConnectionService: ServiceConnectionsService) {
  }

  // @ts-ignore
  @ViewChild('test') d1: ElementRef;

  serviceBaseUrl = Consts.protocol + Consts.apiPath + Consts.apiService;
  calledEndPoint = false;

  // -- API Service
  serviceList = [];
  apiServiceForm = this.requestModels.apiServiceRequest;
  // -- End Point
  endPointList = [];
  apiEndpointForm = this.requestModels.apiEndPointRequest;
  selectedAPIServiceIds = [];
  selectedHttpMethods = [];
  endPointRequestModels = [];
  endPointResponseModels = [];
  queryStringModels = [];
  formattedParameters = [];
  apiMessageList = [];
  apiMessageForm = this.requestModels.apiMessageRequest;
  savedSuccessFully = false;
  apiMessageTypes = [];

  // -- GetAPIServiceList EndPoint
  getAPIServiceList(params) {
    let methodUrl = this.serviceBaseUrl + Consts.getAPIServiceList;
    if (params != null && params.SearchText != null) {
      methodUrl += '?c0=' + params.SearchText;
    }
    this.serviceList = [];
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonList(resp);
          this.serviceList = data;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GetAPIServiceDetails EndPoint
  getAPIServiceDetails(params) {
    const methodUrl = this.serviceBaseUrl + Consts.getAPIServiceDetails + '/' + params.ApiServiceId;
    this.savedSuccessFully = false;
    this.baseMethodService.emptyForm(this.apiServiceForm);
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.baseMethodService.fillResponseToForm(this.apiServiceForm, data);
          if (this.apiServiceForm.Endpoints.Value == null) {
            this.apiServiceForm.Endpoints.Value = [];
          }
          this.baseMethodService.sortBy('EndpointCode', this.apiServiceForm.Endpoints.Value);
          const pEndPointParams = this.requestModels.fnCreateEndpointModel();
          if (this.apiServiceForm.Endpoints.Value.length > 0) {
            pEndPointParams.EndpointCode.Value = this.apiServiceForm.Endpoints.Value[this.apiServiceForm.Endpoints.Value.length - 1].EndpointCode + 1;
          } else {
            pEndPointParams.EndpointCode.Value = 1;
          }
          this.apiServiceForm.Endpoints.Value.push(pEndPointParams);
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- SetAPIService EndPoint
  setAPIService(params) {
    const methodUrl = this.serviceBaseUrl + Consts.setAPIService;
    this.calledEndPoint = true;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.router.navigate(['/main/api-service-list']);
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- DeleteAPIService EndPoint
  deleteAPIService(params) {
    const methodUrl = this.serviceBaseUrl + Consts.deleteAPIService + '/' + params.ApiServiceId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.DELETE)
      .subscribe(resp => {
          this.router.navigate(['/main/api-service-list']);
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GetAPIEndpointList APIEndpoint
  getAPIEndpointList(params) {
    let methodUrl = this.serviceBaseUrl + Consts.getAPIEndpointList + '?1=1';
    if (params.APIServiceId != null) {
      methodUrl += '&c0=' + params.APIServiceId;
    }
    if (params.SearchText != null) {
      methodUrl += '&c1=' + params.SearchText;
    }
    this.endPointList = [];
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseData(resp);
          this.endPointList = data.Records;

          const selectedAPIService = [];
          data.APIServices.forEach(p => {
            if (params.APIServiceId == p.APIServiceId) {
              selectedAPIService.push(p);
            }
          });
          this.selectedAPIServiceIds = selectedAPIService;
          this.serviceList = data.APIServices;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GetAPIEndpointDetails APIEndpoint
  getAPIEndpointDetails(params) {
    const methodUrl = this.serviceBaseUrl + Consts.getAPIEndpointDetails + '/' + params.ApiServiceId;
    this.endPointRequestModels = [];
    this.endPointResponseModels = [];
    this.queryStringModels = [];
    this.formattedParameters = [];
    this.savedSuccessFully = false;
    this.baseMethodService.emptyForm(this.apiEndpointForm);
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.baseMethodService.fillResponseToForm(this.apiEndpointForm, data);
          //-- Get Lists from Response
          this.serviceList = data.APIServices;
          this.apiMessageList = data.APIMessages;
          //-- Set Selected Service Id
          this.selectedAPIServiceIds = this.baseMethodService.fnGetSelectedValue(this.serviceList, 'APIServiceId', this.apiEndpointForm.APIServiceId.Value);
          // -- Set Selected the API response on message
          if (this.apiEndpointForm.APIResponses.Value == null) {
            this.apiEndpointForm.APIResponses.Value = [];
          } else {
            this.apiEndpointForm.APIResponses.Value.forEach(ap => {
              ap.SelectedAPIServiceIds.Value = this.baseMethodService.fnGetSelectedValue(this.apiMessageList, 'APIMessageId', ap.APIMessageId.Value);
            });
          }
          // -- Sort the API Responses
          this.baseMethodService.sortBy('Level', this.apiEndpointForm.APIResponses.Value);
          // -- Add one more api response for new row
          const pEndPointParams = this.requestModels.fnCreateAPIResponseModel();
          if (this.apiEndpointForm.APIResponses.Value.length > 0) {
            pEndPointParams.Level.Value = this.apiEndpointForm.APIResponses.Value[this.apiEndpointForm.APIResponses.Value.length - 1].Level.Value + 1;
          } else {
            pEndPointParams.Level.Value = 102;
          }
          this.apiEndpointForm.APIResponses.Value.push(pEndPointParams);
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- SetAPIEndpoint APIEndpoint
  setAPIEndpoint(params) {
    const methodUrl = this.serviceBaseUrl + Consts.setAPIEndpoint;
    this.calledEndPoint = true;
    this.savedSuccessFully = false;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.router.navigate(['/main/api-endpoint-list']);
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- DeleteAPIEndpoint APIEndpoint
  deleteAPIEndpoint(params) {
    const methodUrl = this.serviceBaseUrl + Consts.deleteAPIEndpoint + '/' + params.APIEndpointId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.DELETE)
      .subscribe(resp => {
          if (window.location.href.toString().indexOf('endpoint') == -1) {
            let i = 0;
            this.apiServiceForm.Endpoints.Value.forEach(ep => {
              if (ep.APIEndpointId == params.APIEndpointId) {
                this.apiServiceForm.Endpoints.Value.splice(i, 1);
              }
              i++;
            });
          } else {
            this.router.navigate(['/main/api-endpoint-list']);
          }
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- DeleteAPIResponse APIEndpoint
  deleteAPIResponse(params) {
    const methodUrl = this.serviceBaseUrl + Consts.deleteAPIResponse + '/' + params.APIResponseId.Value;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.DELETE)
      .subscribe(resp => {
          let i = 0;
          this.apiEndpointForm.APIResponses.Value.forEach(ep => {
            if (ep.APIResponseId.Value == params.APIResponseId.Value) {
              this.apiEndpointForm.APIResponses.Value.splice(i, 1);
            }
            i++;
          });
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GETApiMessageList APIEndpoint
  getApiMessageList(params) {
    let methodUrl = this.serviceBaseUrl + Consts.getAPIMessageList + '?1=1';
    if (params != null && params.SearchText != null) {
      methodUrl += '&c1=' + params.SearchText;
    }
    this.apiMessageList = [];
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseData(resp);
          this.apiMessageList = data.Records;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GetApiMessageDetails APIEndpoint
  getApiMessageDetails(params) {
    let methodUrl = this.serviceBaseUrl + Consts.getAPIMessageDetails + '/' + params.ApiMessageId;
    this.baseMethodService.emptyForm(this.apiMessageForm);
    this.savedSuccessFully = false;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseData(resp);
          this.apiMessageTypes = data.APIMessageTypes;
          this.baseMethodService.fillResponseToForm(this.apiMessageForm, data);
          if (this.apiMessageForm.Translations.Value == null) {
            this.apiMessageForm.Translations.Value = [];
            data.Languages.forEach(l => {
              const p = {
                Language: l.Id,
                LanguageName: l.LanguageName,
                Translation: null
              };
              this.apiMessageForm.Translations.Value.push(p);
            });
          } else {
            data.Languages.forEach(l => {
              this.apiMessageForm.Translations.Value.forEach(x => {
                if (l.Id == x.Language) {
                  x.LanguageName = l.LanguageName;
                }
              });
            });
          }
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- SetAPIMessage APIEndpoint
  setAPIMessage(params) {
    const methodUrl = this.serviceBaseUrl + Consts.setAPIMessage;
    this.calledEndPoint = true;
    this.savedSuccessFully = false;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          if (document.getElementById('btnOpenMessage') != null) {
            document.getElementById('btnCloseMessageModal').click();
            this.getApiMessageList(null);
          } else {
            this.router.navigate(['/main/api-message-list']);
          }
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- deleteAPIMessage APIEndpoint
  deleteAPIMessage(params) {
    const methodUrl = this.serviceBaseUrl + Consts.deleteAPIMessage + '/' + params.ApiMessageId;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.DELETE)
      .subscribe(resp => {
          this.router.navigate(['/main/api-message-list']);
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }
}
