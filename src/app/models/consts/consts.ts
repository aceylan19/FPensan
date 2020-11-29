export class Consts {
  // -- Api information
  public static protocol = 'http://';
  public static apiPath = 'pensan-api.flepron.com/';
  public static resourcesFolder = 'resources/web/';
  public static serviceType = 'svc';
  // -- User Service
  public static userService = 'UserService' + '.' + Consts.serviceType + '/';
  // -- Management service
  public static managment = 'Management' + '.' + Consts.serviceType + '/';
  public static login = 'Login';
  public static forgotPassword = 'ForgotPassword';
  public static resetPassword = 'ResetPassword';
  public static changePassword = 'ChangePassword';
  // -- Translate Service
  public static translation = 'Translation' + '.' + Consts.serviceType + '/';
  // -- Language
  public static getLanguageList = 'GetLanguageList';
  public static getLanguageDetails = 'GetLanguageDetails';
  public static setLanguage = 'SetLanguage';
  public static deleteLanguage = 'DeleteLanguage';
  public static updateUserLanguage = 'UpdateUserLanguage';
  // -- DBMessageAccount
  public static getDBMessageAccountList = 'GetDBMessageAccountList';
  public static getDBMessageAccountDetails = 'GetDBMessageAccountDetails';
  public static setDBMessageAccount = 'SetDBMessageAccount';
  public static deleteDBMessageAccount = 'DeleteDBMessageAccount';
  // -- DBMessageTemplate
  public static getDBMessageTemplateList = 'GetDBMessageTemplateList';
  public static getDBMessageTemplateDetails = 'GetDBMessageTemplateDetails';
  public static setDBMessageTemplate = 'SetDBMessageTemplate';
  public static deleteDBMessageTemplate = 'DeleteDBMessageTemplate';
  // -- Enum Translatiions
  public static getEnumTranslations = 'GetEnumTranslations';
  public static setEnumTranslations = 'SetEnumTranslations';
  // -- Country
  public static getCountryList = 'GetCountryList';
  public static getCountryDetails = 'GetCountryDetails';
  public static setCountry = 'SetCountry';
  public static deleteCountry = 'DeleteCountry';
  // -- User
  public static getUserList = 'GetUserList';
  public static getUserDetails = 'GetUserDetails';
  public static setUser = 'SetUser';
  public static deleteUser = 'DeleteUser';
  // -- FileType
  public static getFileTypeList = 'GetDBFileTypeList';
  public static getFileTypeDetails = 'GetDBFileTypeDetails';
  public static setFileType = 'SetDBFileType';
  public static deleteFileType = 'DeleteDBFileType';
  // -- DB System
  public static dbSystem = 'DBSystem' + '.' + Consts.serviceType + '/';
  // -- Sys parameters
  public static getSysParameters = 'GetSysParameters';
  public static setSysParameters = 'SetSysParameters';
  // -- Public service
  public static publicService = 'Public' + '.' + Consts.serviceType + '/';
  // -- Api service
  public static apiService = 'APIService' + '.' + Consts.serviceType + '/';
  // -- Api Service
  public static getAPIServiceList = 'GetAPIServiceList';
  public static getAPIServiceDetails = 'GetAPIServiceDetails';
  public static setAPIService = 'SetAPIService';
  public static deleteAPIService = 'DeleteAPIService';
  // -- End Point
  public static getAPIEndpointList = 'GetAPIEndpointList';
  public static getAPIEndpointDetails = 'GetAPIEndpointDetails';
  public static setAPIEndpoint = 'SetAPIEndpoint';
  public static deleteAPIEndpoint = 'DeleteAPIEndpoint';
  public static deleteAPIResponse = 'DeleteAPIResponse';
  // -- API Response Message
  public static getAPIMessageList = 'GetAPIMessageList';
  public static getAPIMessageDetails = 'GetAPIMessageDetails';
  public static setAPIMessage = 'SetAPIMessage';
  public static deleteAPIMessage = 'DeleteAPIMessage';
  // -- Enum Translatiions
  public static getStaticTranslations = 'GetStaticTranslations';
  public static setStaticTranslations = 'SetStaticTranslations';
  // -- Dynamic
  public static getDynamicTranslations = 'GetDynamicTranslations';
  public static setDynamicTranslations = 'SetDynamicTranslations';
  //  -- General service
  public static general = 'General' + '.' + Consts.serviceType + '/';
  public static uploadFile = 'UploadFile';
  public static deleteRecordFile = 'DeleteRecordFile';
  public static getExcelFileFromJSON = 'GetExcelFileFromJSON';
  public static getRecordCommentList = 'GetRecordCommentList';
  public static setRecordComment = 'SetRecordComment';
  //-- Inside web
  public static nullValue = 'NullVallueOption';
  public static dataPerPage = 10;
  public static paginationPageSize = 5;
  public static pageDataPerPageProductionLine = 8;
}
