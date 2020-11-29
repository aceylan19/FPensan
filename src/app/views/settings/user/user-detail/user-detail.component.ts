import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../../../../services/management/management.service';
import {BaseMethodsService} from '../../../../services/base/base-methods.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(public managementService: ManagementService,
              public baseCtrl: BaseMethodsService,
              public routeParams: ActivatedRoute) {
  }

  submitted = false;
  userId = null;

  ngOnInit() {
    this.userId = this.routeParams.snapshot.params.userId;
    const params = {
      UserId: this.userId
    };
    this.managementService.getUserDetails(params);
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.checkRequiredFields(this.managementService.userDetailsForm);
    if (params != false) {
      console.log(JSON.stringify(params));
      this.managementService.setUser(params);
    }
  }

  onDeleteConfirm() {
    this.userId = this.routeParams.snapshot.params.userId;
    const params = {
      UserId: this.userId
    };
    this.managementService.deleteUser(params);
  }

  onSelectUserType(item: any) {
    this.managementService.userDetailsForm.UserType.Value = item.Id;
  }
  onDeSelectUserType() {
    this.managementService.userDetailsForm.UserType.Value = null;
  }


  onSelectCountryCode(item: any) {
    this.managementService.userDetailsForm.CountryId.Value = item.CountryId;
  }
  onDeSelectCountryCode() {
    this.managementService.userDetailsForm.CountryId.Value = null;
  }

  onSelectLanguageCode(item: any) {
    this.managementService.userDetailsForm.Language.Value = item.Id;
  }

  onDeSelectLanguageCode() {
    this.managementService.userDetailsForm.Language.Value = null;
  }


}
