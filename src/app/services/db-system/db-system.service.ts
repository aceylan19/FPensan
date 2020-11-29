import {Injectable} from '@angular/core';
import {Consts} from '../../models/consts/consts';
import {Enums} from '../../models/enums/enums';
import {ErrorManagementService} from '../error/error-management.service';
import {BaseMethodsService} from '../base/base-methods.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseModelsService} from '../response-models/response-models.service';
import {TranslateService} from '@ngx-translate/core';
import {RequestModelsService} from '../request-models/request-models.service';
import {ServiceConnectionsService} from '../service-connections.service';

@Injectable({
  providedIn: 'root'
})
export class DbSystemService {

  constructor(private baseMethodService: BaseMethodsService,
              private http: HttpClient,
              private router: Router,
              private responseModels: ResponseModelsService,
              private routeParams: ActivatedRoute,
              private translate: TranslateService,
              private requestModels: RequestModelsService,
              // private resonseModels: ResponseModelsService,
              private serviceConnectionService: ServiceConnectionsService) {
  }

  serviceBaseUrl = Consts.protocol + Consts.apiPath + Consts.dbSystem;
  // -- System parameters
  sysParametersList = [];
  sysParamatersSuccessFullySaved = false;
  calledEndPoint = false;
  // -- Message Account Variables
  messageAccountList = [];
  accountTypes = [];
  messageAccountForm = this.requestModels.setMessageAccountRequest;
  // -- Message Template Variables
  selectedAccountTypes = [];
  messageTemplateList = [];
  messageTemplateForm = this.requestModels.messageTemplateAccountRequest;
  templateTypes = [];
  priorities = [];

  // -- GetSysParameters EndPoint
  getSysParameters() {
    const methodUrl = this.serviceBaseUrl + Consts.getSysParameters;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseData(resp);
          this.sysParametersList = data;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GetSysParameters EndPoint
  setSysParameters() {
    const methodUrl = this.serviceBaseUrl + Consts.setSysParameters;
    this.calledEndPoint = true;
    this.serviceConnectionService.serviceConnection(methodUrl, this.sysParametersList, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.sysParamatersSuccessFullySaved = true;
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }


  // -- Message Account EndPoints
  // -- GetDBMessageAccountList EndPoint
  getDBMessageAccountList() {
    const methodUrl = this.serviceBaseUrl + Consts.getDBMessageAccountList;
    this.messageAccountList = [];
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonList(resp);
          if (data != null) {
            this.messageAccountList = data;
          }
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GetDBMessageAccountDetail EndPoint
  getDBMessageAccountDetails(params) {
    this.selectedAccountTypes = [];
    this.baseMethodService.emptyForm(this.requestModels.setMessageAccountRequest);
    const methodUrl = this.serviceBaseUrl + Consts.getDBMessageAccountDetails + '/' + params.DBMessageAccountId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonDetails(resp);
          console.log(JSON.stringify(data));
          if (data.Records != null) {
            // -- Fill form for message account
            this.baseMethodService.fillResponseToForm(this.messageAccountForm, data);
            // -- Find selected account type
            const selectedAccountTypes = [];
            data.AccountTypes.forEach(at => {
              if (at.Id == this.messageAccountForm.AccountType.Value) {
                selectedAccountTypes.push(at);
              }
            });
            this.selectedAccountTypes = selectedAccountTypes;
          }
          // -- Set the account type to account types
          this.accountTypes = data.AccountTypes;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- SetDBMessageAccount EndPoint
  setDBMessageAccount(params) {
    const methodUrl = this.serviceBaseUrl + Consts.setDBMessageAccount;
    this.calledEndPoint = true;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.router.navigate(['/main/message-account-list']);
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- DeleteDBMessageAccount EndPoint
  deleteDBMessageAccount(params) {
    const methodUrl = this.serviceBaseUrl + Consts.deleteDBMessageAccount + '/' + params.DBMessageAccountId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.DELETE)
      .subscribe(resp => {
          this.router.navigate(['/main/message-account-list']);
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- Message Template EndPoints
  // -- GetDBMessageTemplateList EndPoint
  getDBMessageTemplateList() {
    const methodUrl = this.serviceBaseUrl + Consts.getDBMessageTemplateList;
    this.messageTemplateList = [];
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonList(resp);
          this.messageTemplateList = data;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GetDBMessageTemplateDetail EndPoint
  getDBMessageTemplateDetails(params) {
    this.selectedAccountTypes = [];
    this.baseMethodService.emptyForm(this.messageTemplateForm);
    const methodUrl = this.serviceBaseUrl + Consts.getDBMessageTemplateDetails + '/' + params.DBMessageTemplateId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonDetails(resp);
          if (data.Records != null) {
            // -- Fill form for message account
            this.baseMethodService.fillResponseToForm(this.messageTemplateForm, data);
            this.baseMethodService.fillLanguageName(this.messageTemplateForm.MessageBodies.Value, data.Languages);
            this.baseMethodService.fillLanguageName(this.messageTemplateForm.Subjects.Value, data.Languages);
          } else {
            this.messageTemplateForm.MessageBodies.Value = [];
            this.baseMethodService.prepareDynamicTranslation(this.messageTemplateForm.MessageBodies.Value, data.Languages);
            this.messageTemplateForm.Subjects.Value = [];
            this.baseMethodService.prepareDynamicTranslation(this.messageTemplateForm.Subjects.Value, data.Languages);
          }
          this.messageAccountList = data.MessageAccounts;
          this.templateTypes = data.TemplateTypes;
          this.priorities = data.Priorities;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- SetDBMessageTemplate EndPoint
  setDBMessageTemplate(params) {
    const methodUrl = this.serviceBaseUrl + Consts.setDBMessageTemplate;
    this.calledEndPoint = true;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.router.navigate(['/main/message-template-list']);
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- DeleteDBMessageTemplate EndPoint
  deleteDBMessageTemplate(params) {
    const methodUrl = this.serviceBaseUrl + Consts.deleteDBMessageTemplate + '/' + params.DBMessageTemplateId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.DELETE)
      .subscribe(resp => {
          this.router.navigate(['/main/message-template-list']);
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

}
