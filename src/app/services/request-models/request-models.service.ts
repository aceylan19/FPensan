import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestModelsService {
  constructor() {
  }

  // -- Login Request
  loginRequest = {
    Email: {Value: null, IsRequired: true, IsSendRequest: true},
    Password: {Value: null, IsRequired: true, IsSendRequest: true}
  };
  // -- ResetPassword Request
  resetPasswordRequest = {
    Code: {Value: null, IsRequired: true, IsSendRequest: true},
    NewPassword: {Value: null, IsRequired: true, IsSendRequest: true},
    RepeatPassword: {Value: null, IsRequired: true, IsSendRequest: true},
  };

  // -- Change Passowrd Request
  changePasswordForm = {
    NewPassword: {Value: null, IsRequired: true, IsSendRequest: true},
    RepeatPassword: {Value: null, IsRequired: true, IsSendRequest: true},
    OldPassword: {Value: null, IsRequired: true, IsSendRequest: true},
  };
  // -- ForgotPassword Request
  forgotPasswordRequest = {
    Email: {Value: null, IsRequired: true, IsSendRequest: true},
  };
  // -- SetMessageAccount Request
  setMessageAccountRequest = {
    DBMessageAccountId: {Value: null, IsRequired: false, IsSendRequest: true},
    AccountType: {Value: null, IsRequired: true, IsSendRequest: true},
    AccountName: {Value: null, IsRequired: true, IsSendRequest: true},
    SenderName: {Value: null, IsRequired: true, IsSendRequest: true},
    Email: {Value: null, IsRequired: true, IsSendRequest: true},
    Number: {Value: null, IsRequired: false, IsSendRequest: true},
    Host: {Value: null, IsRequired: false, IsSendRequest: true},
    UserName: {Value: null, IsRequired: false, IsSendRequest: true},
    Password: {Value: null, IsRequired: false, IsSendRequest: true},
    Port: {Value: null, IsRequired: false, IsSendRequest: true},
    UseSSL: {Value: false, IsRequired: false, IsSendRequest: true},
    Domain: {Value: null, IsRequired: false, IsSendRequest: true},
  };
  // -- SetLanguage Request
  setLanguageRequest = {
    Id: {Value: null, IsRequired: false, IsSendRequest: true},
    CultureName: {Value: null, IsRequired: true, IsSendRequest: true},
    LanguageName: {Value: null, IsRequired: true, IsSendRequest: true},
    ShortName: {Value: null, IsRequired: true, IsSendRequest: true},
    Icon: {Value: null, IsRequired: false, IsSendRequest: true},
    IconBase64: {Value: null, IsRequired: false, IsSendRequest: true},
  };
  // -- SetMessageTemplate Request
  messageTemplateAccountRequest = {
    DBMessageTemplateId: {Value: null, IsRequired: false, IsSendRequest: true},
    TemplateType: {Value: null, IsRequired: true, IsSendRequest: true},
    DBMessageAccountId: {Value: null, IsRequired: true, IsSendRequest: true},
    TemplateName: {Value: null, IsRequired: true, IsSendRequest: true},
    Subjects: {Value: null, IsRequired: true, LanguageRequired: true, IsSendRequest: true},
    MessageBodies: {Value: null, IsRequired: true, LanguageRequired: true, IsSendRequest: true},
  };
  // -- Country Request
  countryFormRequest = {
    CountryId: {Value: null, IsSendRequest: true, IsRequired: false},
    CountryCode: {Value: null, IsSendRequest: true, IsRequired: true},
    AreaCode: {Value: null, IsSendRequest: true, IsRequired: true},
    PhoneMask: {Value: null, IsSendRequest: true, IsRequired: true},
    IsRegionExist: {Value: false, IsSendRequest: true, IsRequired: true},
    Language: {Value: null, IsSendRequest: true, IsRequired: true},
    CountryNames: {Value: null, IsSendRequest: true, IsRequired: true, IsSubList: true, ModelFunction: 'fnTranslationModel'}
    // Country Name translations
  };


  // -- File Type
  fileTypeDetailsForm = {
    FileTypeId: {Value: null, IsRequired: false, IsSendRequest: true},
    RecordSource: {Value: null, IsRequired: true, IsSendRequest: true},
    RecordSourceValue: {Value: null, IsRequired: false, IsSendRequest: true},
    Descriptions: {Value: null, IsRequired: false, LanguageRequired: false, IsSendRequest: true},
    IsRequired: {Value: false, IsRequired: false, IsSendRequest: true},
    AllowMultiple: {Value: false, IsRequired: false, IsSendRequest: true},
    FileTypeNames: {Value: null, IsRequired: true, LanguageRequired: true, IsSendRequest: true},
  };

  // -- APIService Request
  apiServiceRequest = {
    APIServiceId: {Value: null, IsRequired: false, IsSendRequest: true},
    ServiceCode: {Value: null, IsRequired: true, IsSendRequest: true},
    ServiceName: {Value: null, IsRequired: true, IsSendRequest: true},
    Endpoints: {Value: [], IsRequired: true, IsSendRequest: true, IsSubList: true, ModelFunction: 'fnCreateEndpointModel'}, // --
                                                                                                                            // fnCreateEndpointModel
  };

  fnCreateEndpointModel() {
    const params = {
      APIEndpointId: {Value: null, IsRequired: false, IsSendRequest: true},
      ServiceCode: {Value: null, IsRequired: false, IsSendRequest: true},
      EndpointCode: {Value: null, IsRequired: false, IsSendRequest: true},
      EndpointName: {Value: null, IsRequired: false, IsSendRequest: true}
    };
    return params;
  }


  // -- APIService Request
  apiEndPointRequest = {
    APIEndpointId: {Value: null, IsRequired: false, IsSendRequest: true},
    APIServiceId: {Value: null, IsRequired: true, IsSendRequest: true},
    EndpointCode: {Value: null, IsRequired: true, IsSendRequest: true},
    EndpointName: {Value: null, IsRequired: true, IsSendRequest: true},
    Authorization: {Value: null, IsRequired: false, IsSendRequest: true},
    APIResponses: {Value: [], IsRequired: true, IsSubList: true, ModelFunction: 'fnCreateAPIResponseModel', IsSendRequest: true},
  };
  fnCreateAPIResponseModel() {
    const params = {
      APIResponseId: {Value: null, IsRequired: false, IsSendRequest: true},
      Level: {Value: null, IsRequired: true, IsSendRequest: true},
      DefaultMessage: {Value: null, IsRequired: true, IsSendRequest: true},
      APIMessageId: {Value: null, IsRequired: false, IsSendRequest: true},
      SelectedAPIServiceIds: {Value: [], IsRequired: false, IsSendRequest: false}
    };
    return params;
  }

  // -- APIMessage Request
  apiMessageRequest = {
    APIMessageId: {Value: null, IsRequired: false},
    APIMessageType: {Value: null, IsRequired: true},
    MessageCode: {Value: null, IsRequired: true},
    MessageText: {Value: null, IsRequired: true},
    Translations: {Value: [], IsRequired: true},
  };
  // -- User request form
  userDetailsForm = {
    UserCode: {Value: null, IsRequired: false},
    UserId: {Value: null, IsRequired: false},
    UserType: {Value: null, IsRequired: true},
    UserTitle: {Value: null, IsRequired: false},
    PinCode: {Value: null, IsRequired: false, SendRequest: false},
    Language: {Value: null, IsRequired: true},
    IsActive: {Value: true, IsRequired: false},
    EmailReceiver: {Value: true, IsRequired: false},
    Email: {Value: null, IsRequired: false},
    JobTitle: {Value: null, IsRequired: false, SendRequest: false},
    CountryId: {Value: null, IsRequired: false},
    PhoneNumber: {Value: null, IsRequired: false}
  };


  fnTranslationModel() {
    const params = {
      Language: {Value: null, IsSendRequest: true, IsRequired: true},
      LanguageName: {Value: null, IsSendRequest: false, IsRequired: true},
      Translation: {Value: null, IsSendRequest: true, IsRequired: true}
    };
    return params;
  }

}
