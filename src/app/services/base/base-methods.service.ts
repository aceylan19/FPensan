import {Injectable} from '@angular/core';
import {Enums} from '../../models/enums/enums';
import {EnumsList} from '../../models/enums/enum-list';
import {TranslateService} from '@ngx-translate/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import {ApiServiceService} from '../api-service/api-service.service';
import {Consts} from '../../models/consts/consts';
import {RequestModelsService} from '../request-models/request-models.service';

@Injectable({
  providedIn: 'root'
})
export class BaseMethodsService {

  constructor(private translate: TranslateService, private requestModels: RequestModelsService) {
  }

  dataPerPage = Consts.dataPerPage;
  paginationPageSize = Consts.paginationPageSize;

  languageComboboxSettings = {
    singleSelection: true,
    idField: 'Id',
    textField: 'LanguageName',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  userComboboxSetting = {
    singleSelection: true,
    idField: 'UserId',
    textField: 'UserTitle',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };

  countryComboboxSetting = {
    singleSelection: true,
    idField: 'CountryId',
    textField: 'CountryName',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  apiServiceComboboxSetting = {
    singleSelection: true,
    idField: 'APIServiceId',
    textField: 'ServiceName',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  apiMessageComboboxSetting = {
    singleSelection: true,
    idField: 'APIMessageId',
    textField: 'MessageText',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  regionComboboxSetting = {
    singleSelection: true,
    idField: 'RegionId',
    textField: 'RegionName',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  cityComboboxSetting = {
    singleSelection: true,
    idField: 'CityId',
    textField: 'CityName',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };

  enumSelectionSetting = {
    singleSelection: true,
    idField: 'Id',
    textField: 'Description',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  enumMultiSelectionSetting = {
    singleSelection: false,
    idField: 'Id',
    textField: 'Description',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  shipCompamySelectionSetting = {
    singleSelection: true,
    idField: 'ShipCompanyId',
    textField: 'ShipCompanyName',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  entryPointSelectionSetting = {
    singleSelection: true,
    idField: 'EntryPointId',
    textField: 'EntryPointName',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  multiSelectionCurrencySetting = {
    singleSelection: false,
    idField: 'CurrencyId',
    textField: 'Symbol',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  singleSelectionCurrencySetting = {
    singleSelection: true,
    idField: 'CurrencyId',
    textField: 'Symbol',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  newMonth: string;
  newDay: string;
  newDate: string;
  smallModalOptions = {
    size: 'md',
    backdrop: true,
    keyboard: true
  };
  allowedLanguage = ['tr', 'uk', 'ru'];
  countRateMaskSettings = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '',
    decimalLimit: 0,
    allowDecimal: false,
    allowNegative: false,
  });
  public countMask = this.countRateMaskSettings;
  priceMaskSettings = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '',
    decimalSeparatorSymmbol: '.',
    decimalLimit: 4,
    allowDecimal: true,
    allowNegative: true,
  });
  public priceMask = this.priceMaskSettings;

  public dateFormat = 'dd/MM/yyyy';
  public dateTimeFormat = 'dd/MM/yyyy HH:mm';
  public timeFormat = 'HH:mm';

  // -- Local storage methods
  setHandleStorageData(key, value) {
    localStorage.setItem(key, value);
  }

  getHandleStorageData(key) {
    return localStorage.getItem(key);
  }

  parseDate(date) {
    if (date != null) {
      date.month < 10 ? this.newMonth = '0' + date.month : this.newMonth = date.month;
      date.day < 10 ? this.newDay = '0' + date.day : this.newDay = date.day;
    }
    return this.newDate = date.year + '-' + this.newMonth + '-' + this.newDay;
  }

  parseDateToShowWithDot(date, timeExist) {
    if (date != null) {
      var dateSplit = date.toString().split('-');
      var returning = dateSplit[2].toString().substr(0, 2) + '.' + dateSplit[1] + '.' + dateSplit[0];
      if (timeExist) {
        var timeSplit = date.toString().split('T');
        returning += ' ' + timeSplit[1];
      }
      return returning;
    }
  }

  parseDateToShow(date) {
    var dateSplit = date.toString().split('-');
    var result = {
      day: dateSplit[2],
      month: dateSplit[1],
      year: dateSplit[0]
    };
    return result;
  }

  replaceAll(stringText, oldChar, newChar) {
    var turnStr = '';
    var strLength = stringText.length;
    for (var i = 0; i < strLength; i++) {
      turnStr += stringText[i].replace(oldChar, newChar);
    }
    return turnStr;
  }

  fnClearAllIntervals() {
    for (var i = 1; i < 99999; i++) {
      window.clearInterval(i);
    }
  }


  checkIdsEmpty(request) {
    const endPointRequest = {};
    for (const key in request) {
      if (key.toString().indexOf('Id') != -1 && request[key] == Consts.nullValue) {
        request[key] = null;
      }
      endPointRequest[key] = request[key];
    }
    return endPointRequest;
  }

  fillResponseToForm(requestForm, data) {
    let response = {};
    if (data.Records != null) {
      response = data.Records[0];
    } else {
      response = data;
    }
    for (const key in response) {
      if (requestForm[key] != null) {
        if (requestForm[key].IsDateField == true && response[key] != null) {
          const sendDate = new Date(response[key]);
          requestForm[key].Value = {
            year: sendDate.getFullYear(),
            month: sendDate.getMonth() + 1,
            day: sendDate.getDate()
          };
        } else if (requestForm[key].IsSubList == true) {
          if (requestForm[key].Value == null) {
            requestForm[key].Value = [];
          }
          if (response[key] != null) {
            response[key].forEach(rk => {
              let params = this.requestModels[requestForm[key].ModelFunction]();
              if (params != null) {
                this.fillResponseToForm(params, rk);
                requestForm[key].Value.push(params);
              }
            });
          }
        } else {
          requestForm[key].Value = response[key];
        }
      }
    }
  }

  fnGetSelectedValue(list, field, Id) {
    let result = [];
    list.forEach(f => {
      if (f[field] == Id) {
        result.push(f);
      }
    });
    return result;
  }

  fillResponseToDetail(response, data) {
    for (const key in response) {
      response[key] = data[key];
    }
  }

  languageList = [];

  fnGetLanguage() {
    const lang = parseInt(this.getHandleStorageData('languageId'));
    let returnLanguage = this.languageList[0];
    if (lang != null) {
      this.languageList.forEach(l => {
        if (lang != null && l.Id == lang) {
          returnLanguage = l;
        }
      });
    }
    return returnLanguage;
  }

  changeLanguageOnPage() {
    const langShortName = this.fnGetLanguage();
    this.translate.setDefaultLang(langShortName.CultureName);
  }

  searchPlaceHolder = null;

  checkField(field) {
    if (field.MultiRequired) {
      let allOK = false;
      if (field.Value != null) {
        field.Value.forEach(f => {
          if (f.Translation == null || f.Translation == '') {
            allOK = true;
          }
        });
      }
      return allOK;
    } else if (field.IsRequired && (field.Value == null || field.Value == '')) {
      return true;
    }
    return false;
  }

  changeTranslationsField(field) {
    let returnValue = false;
    if (field != null && field.Value != null) {
      field.Value.forEach(t => {
        if (t.Translation == '' || t.Translation == null) {
          returnValue = true;
        }
      });
    }
    return returnValue;
  }

  //- Empty form request
  emptyForm(request) {
    const endPointRequest = {};
    for (let key in request) {
      if (request[key].ArrayList == true) {
        request[key].Value = [];
      } else {
        request[key].Value = null;
      }
    }
  }

  days = [
    {Id: 0, Desc: 'monday'},
    {Id: 1, Desc: 'tuesday'},
    {Id: 2, Desc: 'wednesday'},
    {Id: 3, Desc: 'thursday'},
    {Id: 4, Desc: 'friday'},
    {Id: 5, Desc: 'saturday'},
    {Id: 6, Desc: 'sunday'}
  ];


  fnUpdateParameterValues(parameters) {
    parameters.forEach(p => {
      p.isOpened = false;
      p.Added = true;
      if (p.Parameters != null) {
        this.fnUpdateParameterValues(p.Parameters);
      }
    });
    for (let i = 0; i < parameters.length; i++) {
      parameters[i].ParameterIndex = i + 1;
    }
  }

  checkRequiredFields(request) {
    let endPointRequest = {};
    for (let key in request) {
      if (endPointRequest != false) {
        if (request[key].IsSendRequest == true) {
          if (request[key].IsSubList == true) {
            if (request[key].Value != null || request[key].Value != '') {
              endPointRequest[key] = [];
              for(let r of request[key].Value) {
                let p = this.checkRequiredFields(r);
                console.log(endPointRequest, endPointRequest[key], key);
                if (p != false) {
                  endPointRequest[key].push(p);
                } else {
                  endPointRequest = false;
                  break;
                }
              }
            }
          } else if (request[key].IsRequired == true && (request[key].Value == null || request[key].Value == '')) {
            endPointRequest = false;
          } else if (endPointRequest != false) {
            endPointRequest[key] = request[key].Value;
          }
        }
      }
    }
    return endPointRequest;
  }

  removeParameter(p, parameters) {
    let i = 0;
    parameters.forEach(par => {
      if (par.ParameterId == p.ParameterId && p.ParentId != null) {
        parameters.splice(1, i);
      }
      i++;
    });
  }

  fnChangePlaceForObject(parameters, addedParameters) {
    parameters.forEach(p => {
      if (p.ParentId == null && addedParameters != null) {
        addedParameters.push(p);
      }
      if (p.ParentId != null) {
        parameters.forEach(par => {
          if (p.ParentId == par.ParameterId) {
            if (par.Parameters == null) {
              par.Parameters = [];
            }
            p.ParentId = null;
            par.Parameters.push(p);
          }
        });
        this.removeParameter(p, parameters);
      }
      if (p.Parameters != null) {
        this.fnChangePlaceForObject(p.Parameters, null);
      }
    });
  }

  fnNumerically(parameters) {
    for (let i = 0; i < parameters.length; i++) {
      parameters[i].ParameterIndex = i + 1;
    }
  }

  prepareDynamicTranslation(form, data) {
    data.forEach(l => {
      const p = this.requestModels.fnTranslationModel();
      p.Language.Value = l.Id;
      p.LanguageName.Value = l.LanguageName;
      form.push(p);
    });
  }

  fillLanguageName(form, data) {
    data.forEach(l => {
      form.forEach(r => {
        if (r.Language == l.Id) {
          r.LanguageName = l.LanguageName;
          r.Language = l.Id;
        }
      });
    });
  }

  formatDateAsLikeRequest(date) {
    let params = null;
    if (date != null) {
      params = date.year + '-' + date.month + '-' + date.day;
    }
    return params;
  }

  getCityListBySelectedCountry(cities, country, region) {
    const suitableCities = [];
    cities.forEach(city => {
      if ((region != null && city.RegionId == region.RegionId) || (region == null && city.CountryId == country.CountryId)) {
        suitableCities.push(city);
      }
    });
    return suitableCities;
  }

  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      file.Base64FileURL = reader.result;
    };
    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
  }

  fnGetToday() {
    let date = new Date();
    let params = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
    return params;
  }

  // tslint:disable-next-line:variable-name
  _pageNo = null;

  fnCheckExistRequestParams(pageNo) {
    let params = null;
    this._pageNo = pageNo;
    if (this.getHandleStorageData('requestParams') != null) {
      const checkRequestParams = JSON.parse(this.getHandleStorageData('requestParams'));
      // tslint:disable-next-line:triple-equals
      if (checkRequestParams != null && checkRequestParams.PageNo == pageNo && checkRequestParams.RequestParams != 'null') {
        params = checkRequestParams.RequestParams;
      } else {
        this.setHandleStorageData('requestParams', null);
      }
    }
    return params;
  }

  sortBy(field: string, list) {
    list.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

