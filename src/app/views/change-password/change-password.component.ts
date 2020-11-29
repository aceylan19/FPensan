import {Component, OnInit} from '@angular/core';
import {BaseMethodsService} from '../../services/base/base-methods.service';
import {ManagementService} from '../../services/management/management.service';
import {UserServiceService} from '../../services/user-service/user-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public userService: UserServiceService, public baseCtrl: BaseMethodsService) {
  }
  submitted = false;

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.checkRequiredFields(this.userService.changePasswordForm);
    if (params != false) {
      this.userService.changePassword(params);
    }
  }

}
