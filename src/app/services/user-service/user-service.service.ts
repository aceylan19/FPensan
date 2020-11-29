import {Injectable} from '@angular/core';
import {Consts} from '../../models/consts/consts';
import {ErrorManagementService} from '../error/error-management.service';
import {Enums} from '../../models/enums/enums';
import {timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseMethodsService} from '../base/base-methods.service';
import {ServiceConnectionsService} from '../service-connections.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseModelsService} from '../response-models/response-models.service';
import {TranslateService} from '@ngx-translate/core';
import {RequestModelsService} from '../request-models/request-models.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private baseMethodService: BaseMethodsService,
              private http: HttpClient,
              private router: Router,
              private responseModels: ResponseModelsService,
              private routeParams: ActivatedRoute,
              private translate: TranslateService,
              private requestModels: RequestModelsService,
              private serviceConnectionService: ServiceConnectionsService) {
  }

  // -- General Variables
  serviceBaseUrl = Consts.protocol + Consts.apiPath + Consts.userService;
  calledEndPoint = false;
  setForgotPasswordSuccess = false;
  savedSuccessfully = false;
  loginForm = this.requestModels.loginRequest;
  // -- reset password
  resetPasswordForm = this.requestModels.resetPasswordRequest;
  // -- Change password
  changePasswordForm = this.requestModels.changePasswordForm;
  flagIcon = null;
  tableLoader = false;
  // -- Login EndPoint
  login(user) {
    const methodUrl = this.serviceBaseUrl + Consts.login;
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

}
