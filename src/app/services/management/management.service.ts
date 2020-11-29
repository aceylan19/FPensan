import {Injectable} from '@angular/core';
import {Consts} from '../../models/consts/consts';
import {ErrorManagementService} from '../error/error-management.service';
import {BaseMethodsService} from '../base/base-methods.service';
import {HttpClient} from '@angular/common/http';
import {Enums} from '../../models/enums/enums';
import {ServiceConnectionsService} from '../service-connections.service';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {RequestModelsService} from '../request-models/request-models.service';
// import {ResponseModelsService} from '../response-models/response-models.service';
import {timer} from 'rxjs';
import {ResponseModelsService} from '../response-models/response-models.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
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

  serviceBaseUrl = Consts.protocol + Consts.apiPath + Consts.managment;
  calledEndPoint = false;
  // -- Forgot Passowrd variables
  setForgotPasswordSuccess = false;
  // -- Languages variables
  languageList = [];
  languageFrom = this.requestModels.setLanguageRequest;
  selectedLanguage = [];
  languageIcon = null;
  // -- Message Account Variables
  messageAccountList = [];
  accountTypes = [];
  messageAccountForm = this.requestModels.setMessageAccountRequest;
  selectedAccountTypes = [];
  // -- System parameters
  sysParametersList = [];
  sysParamatersSuccessFullySaved = false;

  // -- Message Tempalates
  messageTemplateList = [];
  messageTemplateForm = this.requestModels.messageTemplateAccountRequest;
  templateTypes = [];
  priorities = [];
  // -- Enum translations
  enumTranslationList = [];
  allEnumTranslationList = [];
  enumTranslationsSuccessFullySaved = false;
  // -- Static translations
  staticTranslationList = [];
  allStaticTranslationList = [];
  staticTranslationsSuccessFullySaved = false;
  // -- Dynamic translations
  dynamicTranslationList = [];
  allDynamicTranslationList = [];
  dynamicTranslationsSuccessFullySaved = false;

  // -- Country
  countryList = [];
  countryDetailsForm = this.requestModels.countryFormRequest;
  isRegionExist = false;
  // -- Region
  selectedCountries = [];
  // -- FileType
  fileTypeDetailsForm = this.requestModels.fileTypeDetailsForm;
  fileTypeList = [];
  recordSources = [];
  // -- User
  userList = [];
  selecetedUserTypes = [];
  userDetailsForm = this.requestModels.userDetailsForm;
  userTypeList = [];
  selectedUser = [];
  // -- reset password
  resetPasswordForm = this.requestModels.resetPasswordRequest;

  // -- Change password
  changePasswordForm = this.requestModels.changePasswordForm;
  savedSuccessfully = false;
  flagIcon = null;
  tableLoader = false;

  loginForm = this.requestModels.loginRequest;
  modalTableLoader = false;

  selectedProductColors = [];
  selectedProductClasses = [];

  languageJsonTranslations = {};

  // -- Login EndPoint
  login(user) {
    const methodUrl = Consts.protocol + Consts.apiPath + Consts.managment + Consts.login;
    this.http.post(methodUrl, JSON.stringify(user))
      .subscribe(
        data => {
          // @ts-ignore
          const result = JSON.parse(data.Data);
          this.baseMethodService.setHandleStorageData('token', result.Token);
          this.baseMethodService.setHandleStorageData('userId', result.UserId);
          this.baseMethodService.setHandleStorageData(
            'userTitle',
            result.UserTitle
          );
          // @ts-ignore
          window.location = '/main/well-come';

        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        }
      );
  }

  // -- ForgotPassword EndPoint
  forgotPassoword(params) {
    const methodUrl = this.serviceBaseUrl + Consts.forgotPassword;
    this.calledEndPoint = true;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.setForgotPasswordSuccess = true;
          this.calledEndPoint = false;
        },
        error => {
          this.setForgotPasswordSuccess = false;
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- ResetPassword EndPoint
  resetPassoword(user) {
    const methodUrl = this.serviceBaseUrl + Consts.resetPassword;
    this.calledEndPoint = true;
    this.http.post(methodUrl, JSON.stringify(user))
      .subscribe(
        data => {
          this.calledEndPoint = false;
          document.getElementById('btnSuccess').click();
          const source = timer(2000, 1000);
          let threeSeconds = 3;
          const abc = source.subscribe(val => {
            if (threeSeconds == 0) {
              // @ts-ignore
              window.location = '/login';
              abc.unsubscribe();
            }
            threeSeconds--;
          });
        },
        error => {
          this.setForgotPasswordSuccess = false;
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        }
      );
  }

  // -- ChangePassword EndPoint
  changePassword(params) {
    const methodUrl = this.serviceBaseUrl + Consts.changePassword;
    this.calledEndPoint = true;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.savedSuccessfully = true;
        },
        error => {
          this.calledEndPoint = false;
          this.savedSuccessfully = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  shownLanguageName = null;
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

  // -- Message Account EndPoints
  // -- GetDBMessageAccountList EndPoint
  getDBMessageAccountList() {
    const methodUrl = this.serviceBaseUrl + Consts.getDBMessageAccountList;
    this.messageAccountList = [];
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonList(resp);
          this.messageAccountList = data;
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

  // --
  // -- getEnumTranslations EndPoint
  getEnumTranslations() {
    const methodUrl = this.serviceBaseUrl + Consts.getEnumTranslations;
    this.tableLoader = true;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          this.tableLoader = false;
          const data = this.serviceConnectionService.parseData(resp);
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

  // -- User EndPoints
  // -- GetUserList EndPoint
  getUserList(params) {
    let methodUrl = this.serviceBaseUrl + Consts.getUserList + '?1=1';
    if (params.userType != null && params.userType != 'null') {
      methodUrl += '&c0=' + params.userType;
    }
    if (params.searchText != null) {
      methodUrl += '&c1=' + params.searchText;
    }
    this.userList = [];
    this.tableLoader = true;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.userList = data.Records;
          this.userTypeList = data.UserTypes;
          this.tableLoader = false;
        },
        error => {
          this.tableLoader = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GetUserDetail EndPoint
  getUserDetails(params) {
    this.selectedAccountTypes = [];
    this.baseMethodService.emptyForm(this.userDetailsForm);
    this.selectedCountries = [];
    this.selectedLanguage = [];
    this.selecetedUserTypes = [];
    const methodUrl = this.serviceBaseUrl + Consts.getUserDetails + '/' + params.UserId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseData(resp);
          if (data.Records != null) {
            // -- Fill form for message account
            this.baseMethodService.fillResponseToForm(this.userDetailsForm, data);
            const userType = [];
            data.UserTypes.forEach(ut => {
              if (ut.Id == this.userDetailsForm.UserType.Value) {
                userType.push(ut);
              }
            });

            this.selecetedUserTypes = userType;

            const selectedCountry = [];

            data.Countries.forEach(ut => {
              if (ut.CountryId == this.userDetailsForm.CountryId.Value) {
                selectedCountry.push(ut);
              }
            });
            this.selectedCountries = selectedCountry;
            const sl = [];
            data.Languages.forEach(ut => {
              if (ut.Id == this.userDetailsForm.Language.Value) {
                sl.push(ut);
              }
            });
            this.selectedLanguage = sl;
          } else {
            this.selectedLanguage = [];
          }
          this.userTypeList = data.UserTypes;
          this.countryList = data.Countries;
          this.languageList = data.Languages;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- SetUser EndPoint
  setUser(params) {
    const methodUrl = this.serviceBaseUrl + Consts.setUser;
    this.calledEndPoint = true;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.router.navigate(['/main/user-list']);
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- DeleteUser EndPoint
  deleteUser(params) {
    const methodUrl = this.serviceBaseUrl + Consts.deleteUser + '/' + params.UserId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.DELETE)
      .subscribe(resp => {
          this.router.navigate(['/main/user-list']);
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

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

  // -- Country
  // -- GetCountryList EndPoint
  getCountryList() {
    const methodUrl = this.serviceBaseUrl + Consts.getCountryList;
    this.countryList = [];
    this.tableLoader = true;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          this.tableLoader = false;
          const data = this.serviceConnectionService.parseDataToJsonList(resp);
          this.countryList = data;
        },
        error => {
          this.tableLoader = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GetCountryDetails EndPoint
  getCountryDetails(params) {
    const methodUrl = this.serviceBaseUrl + Consts.getCountryDetails + '/' + params.CountryId;
    this.baseMethodService.emptyForm(this.countryDetailsForm);
    this.selectedLanguage = [];
    this.flagIcon = null;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.countryDetailsForm.CountryNames.Value = [];
          this.baseMethodService.prepareDynamicTranslation(this.countryDetailsForm.CountryNames.Value, data.Languages);
          if (data.Records != null) {
            this.baseMethodService.fillResponseToForm(this.countryDetailsForm, data);
            this.selectedLanguage = this.baseMethodService.fnGetSelectedValue(data.Languages, 'Id', this.countryDetailsForm.Language.Value);
            this.flagIcon = data.Records[0].Icon;
          }
          this.languageList = data.Languages;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- SetCountry EndPoint
  setCountry(params) {
    const methodUrl = this.serviceBaseUrl + Consts.setCountry;
    this.calledEndPoint = true;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.router.navigate(['/main/country-list']);
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- DeleteCountry EndPoint
  deleteCountry(params) {
    const methodUrl = this.serviceBaseUrl + Consts.deleteCountry + '/' + params.CountryId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.DELETE)
      .subscribe(resp => {
          this.router.navigate(['/main/country-list']);
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- FileType EndPoints
  // -- GetFileTypeList EndPoint
  getFileTypeList(params) {
    let methodUrl = this.serviceBaseUrl + Consts.getFileTypeList + '?1=1';
    if (params.RecordSource != null) {
      methodUrl += '&c0=' + params.RecordSource;
    }
    this.fileTypeList = [];
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.fileTypeList = data.Records;
          this.recordSources = data.RecordSources;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- GetFileTypeDetail EndPoint
  getFileTypeDetails(params) {
    this.selectedAccountTypes = [];
    this.baseMethodService.emptyForm(this.fileTypeDetailsForm);
    const methodUrl = this.serviceBaseUrl + Consts.getFileTypeDetails + '/' + params.FileTypeId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(resp => {
          const data = this.serviceConnectionService.parseDataToJsonDetails(resp);
          if (data.Records != null) {
            // -- Fill form for message account
            const response = data.Records[0];
            for (const key in response) {
              if (this.fileTypeDetailsForm[key] != null) {
                this.fileTypeDetailsForm[key].Value = response[key];
              }
            }
          } else {
            this.fileTypeDetailsForm.FileTypeNames.Value = [];
            this.baseMethodService.prepareDynamicTranslation(this.fileTypeDetailsForm.FileTypeNames.Value, data.Languages);
            this.fileTypeDetailsForm.Descriptions.Value = [];
            this.baseMethodService.prepareDynamicTranslation(this.fileTypeDetailsForm.Descriptions.Value, data.Languages);
          }
          this.recordSources = data.RecordSources;
        },
        error => {
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- SetFileType EndPoint
  setFileType(params) {
    const methodUrl = this.serviceBaseUrl + Consts.setFileType;
    this.calledEndPoint = true;
    this.serviceConnectionService.serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(resp => {
          this.calledEndPoint = false;
          this.router.navigate(['/main/file-type-list']);
        },
        error => {
          this.calledEndPoint = false;
          ErrorManagementService.onShowErrorMessage(error);
        });
  }

  // -- DeleteFileType EndPoint
  deleteFileType(params) {
    const methodUrl = this.serviceBaseUrl + Consts.deleteFileType + '/' + params.FileTypeId;
    this.serviceConnectionService.serviceConnection(methodUrl, null, Enums.MethodType.DELETE)
      .subscribe(resp => {
          this.router.navigate(['/main/file-type-list']);
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
    console.log(JSON.stringify(this.allStaticTranslationList));

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
