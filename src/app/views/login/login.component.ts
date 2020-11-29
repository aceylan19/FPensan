import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../../services/management/management.service';
import {RequestModelsService} from '../../services/request-models/request-models.service';
import {BaseMethodsService} from '../../services/base/base-methods.service';
import {UserServiceService} from '../../services/user-service/user-service.service';
import {TranslateService} from '@ngx-translate/core';
import {TanslationService} from '../../services/translation-service/tanslation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public translateService: TanslationService,
    public userServiceService: UserServiceService,
    public requestModels: RequestModelsService,
    public baseCtrl: BaseMethodsService) {
  }
  submitted = false;

  ngOnInit() {
    this.translateService.getLanguageList();
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.checkRequiredFields(this.userServiceService.loginForm);
    // tslint:disable-next-line:triple-equals
    if (params != false) {
      this.userServiceService.login(params);
    }
  }

  onChangeLanguage() {
    this.baseCtrl.changeLanguageOnPage();
    this.translateService.getLanguageTranslations();
  }

}
