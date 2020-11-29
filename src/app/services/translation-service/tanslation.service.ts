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
import {UserServiceService} from '../user-service/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class TanslationService {

  constructor(private baseMethodService: BaseMethodsService,
              private http: HttpClient,
              private router: Router,
              private responseModels: ResponseModelsService,
              private routeParams: ActivatedRoute,
              private userServiceService: UserServiceService,
              private translate: TranslateService,
              private requestModels: RequestModelsService,
              // private resonseModels: ResponseModelsService,
              private serviceConnectionService: ServiceConnectionsService) {
  }
  serviceBaseUrl = Consts.protocol + Consts.apiPath + Consts.translation;
  tableLoader = false;
  languageList = [];
  languageFrom = this.requestModels.setLanguageRequest;
  selectedLanguage = [];
  languageIcon = null;
  shownLanguageName = null;
  calledEndPoint = false;
  languageJsonTranslations = {};
  // -- Static translations
  staticTranslationList = [];
  allStaticTranslationList = [];
  staticTranslationsSuccessFullySaved = false;
  // -- Dynamic translations
  dynamicTranslationList = [];
  allDynamicTranslationList = [];
  dynamicTranslationsSuccessFullySaved = false;
  // -- Enum translations
  enumTranslationList = [];
  allEnumTranslationList = [];
  enumTranslationsSuccessFullySaved = false;
  // -- Language
  // -- GetLanguageList EndPoint
  getLanguageList() {
    const methodUrl = this.serviceBaseUrl + Consts.getLanguageList;
    this.languageList = [];
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonList(resp);
          this.languageList = data;
          this.baseMethodService.languageList = data;
          const currLanguage = this.baseMethodService.fnGetLanguage();
          this.shownLanguageName = currLanguage.LanguageName;
          this.baseMethodService.changeLanguageOnPage();
          this.getLanguageTranslations();
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }
  // -- GetLanguageDetails EndPoint
  getLanguageDetails(params) {
    const methodUrl = this.serviceBaseUrl + Consts.getLanguageDetails + '/' + params.LanguageId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonDetails(resp);
          if (data.Records != null) {
            // -- Fill form for message account
            const response = data.Records[0];
            this.languageIcon = response.Icon;
            for (const key in response) {
              this.languageFrom[key].Value = response[key];
            }
            console.log(JSON.stringify(response))
          }
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }
  // -- SetLanguage EndPoint
  setLanguage(params) {
    const methodUrl = this.serviceBaseUrl + Consts.setLanguage;
    this.calledEndPoint = true;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.router.navigate(['/main/language-list']);
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }
  // -- UpdateUserLanguage EndPoint
  updateUserLanguage(params) {
    const methodUrl = this.serviceBaseUrl + Consts.updateUserLanguage;
    this.calledEndPoint = true;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.getLanguageTranslations();
          this.router.navigate([window.location.pathname]);
          this.calledEndPoint = false;
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }
  // -- DeleteLanguage EndPoint
  deleteLanguage(params) {
    const methodUrl = this.serviceBaseUrl + Consts.deleteLanguage + '/' + params.LanguageId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.DELETE)
      .subscribe(resp => {
          this.router.navigate(['/main/language-list']);
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // --
  // -- getStaticTranslations EndPoint
  getStaticTranslations() {
    const methodUrl = this.serviceBaseUrl + Consts.getStaticTranslations;
    this.staticTranslationList = [];
    this.tableLoader = true;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseData(resp);
          console.log(JSON.stringify(data))
          this.staticTranslationList = data.Records;
          this.allStaticTranslationList = data.Records;
          this.languageList = data.Languages;
          this.tableLoader = false;
        },
        error => {
          this.tableLoader = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }
  // -- SetStaticTranslations EndPoint
  setStaticTranslations() {
    const methodUrl = this.serviceBaseUrl + Consts.setStaticTranslations;
    this.calledEndPoint = true;
    const staticTranslationRequestParams = [];
    this.allStaticTranslationList.forEach(etl => {
      const params = {
        Static: etl.Static,
        Id: etl.Id,
        Description: etl.Description,
        Translations: []
      };
      let i = 0;
      etl.Translations.forEach(t => {
        if (t.Translation != null) {
          params.Translations.push(t);
        }
        i++;
      });
      staticTranslationRequestParams.push(params);
    });

    this.serviceConnectionService.serviceConnection(methodUrl, this.allStaticTranslationList, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.staticTranslationsSuccessFullySaved = true;
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }
  // --
  // -- getDynamicTranslations EndPoint
  getDynamicTranslations() {
    const methodUrl = this.serviceBaseUrl + Consts.getDynamicTranslations;
    this.tableLoader = true;
    this.dynamicTranslationList = [];
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          this.tableLoader = false;
          const data = this.serviceConnectionService.parseData(resp);
          console.log(JSON.stringify(data));
          this.dynamicTranslationList = data.Records;
          this.allDynamicTranslationList = data.Records;
          this.languageList = data.Languages;
        },
        error => {
          this.tableLoader = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }
  // -- SetDynamicTranslations EndPoint
  setDynamicTranslations() {
    const methodUrl = this.serviceBaseUrl + Consts.setDynamicTranslations;
    this.calledEndPoint = true;
    const dynamicTranslationRequestParams = [];
    this.allDynamicTranslationList.forEach(etl => {
      const params = {
        dynamic: etl.dynamic,
        Id: etl.Id,
        Description: etl.Description,
        Translations: []
      };
      let i = 0;
      etl.Translations.forEach(t => {
        if (t.Translation != null) {
          params.Translations.push(t);
        }
        i++;
      });
      dynamicTranslationRequestParams.push(params);
    });
    this.serviceConnectionService.serviceConnection(methodUrl, this.allDynamicTranslationList, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.dynamicTranslationsSuccessFullySaved = true;
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }
  // -- getEnumTranslations EndPoint
  getEnumTranslations() {
    const methodUrl = this.serviceBaseUrl + Consts.getEnumTranslations;
    this.tableLoader = true;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          this.tableLoader = false;
          const data = this.serviceConnectionService.parseData(resp);
          console.log(JSON.stringify(data));
          this.enumTranslationList = data.Records;
          this.allEnumTranslationList = data.Records;
          this.languageList = data.Languages;
        },
        error => {
          this.tableLoader = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- SetEnumTranslations EndPoint
  setEnumTranslations() {
    const methodUrl = this.serviceBaseUrl + Consts.setEnumTranslations;
    this.calledEndPoint = true;
    const enumTranslationRequestParams = [];
    this.enumTranslationList.forEach(etl => {
      const params = {
        Enum: etl.Enum,
        Id: etl.Id,
        Description: etl.Description,
        Translations: []
      };
      let i = 0;
      etl.Translations.forEach(t => {
        if (t.Translation != null) {
          params.Translations.push(t);
        }
        i++;
      });
      enumTranslationRequestParams.push(params);
    });
    this.serviceConnectionService.serviceConnection(methodUrl, this.enumTranslationList, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.enumTranslationsSuccessFullySaved = true;
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GetLanguageTranslations EndPoint
  getLanguageTranslations() {
    const methodUrl = Consts.protocol + Consts.apiPath + Consts.resourcesFolder + this.baseMethodService.fnGetLanguage().CultureName + '.json';
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          this.languageJsonTranslations = resp;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }


  onGetTranslationByResourceName(resourceName) {
    return this.languageJsonTranslations[resourceName];
  }
}
