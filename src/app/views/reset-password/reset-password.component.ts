import { Component, OnInit } from '@angular/core';
import {ManagementService} from "../../services/management/management.service";
import {RequestModelsService} from "../../services/request-models/request-models.service";
import {BaseMethodsService} from "../../services/base/base-methods.service";
import {ActivatedRoute} from "@angular/router";
import {UserServiceService} from '../../services/user-service/user-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public userService: UserServiceService,
              private requestModels: RequestModelsService,
              private routeParams: ActivatedRoute,
              public baseCtrl: BaseMethodsService) {
  }
  submitted = false
  email = null;
  token = null;
  resetPasswordForm = this.requestModels.resetPasswordRequest;
  message = 'password_successfully_changed';
  ngOnInit() {
    this.token = this.routeParams.snapshot.params['token'];
    this.email = this.routeParams.snapshot.params['email'];
    this.userService.resetPasswordForm.Code.Value = this.token;
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.checkRequiredFields(this.userService.resetPasswordForm);
    if (params != false) {
      this.userService.resetPassoword(params);
    }
  }

}
