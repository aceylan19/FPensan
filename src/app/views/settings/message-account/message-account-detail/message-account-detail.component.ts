import {Component, OnInit} from '@angular/core';
import {ManagementService} from "../../../../services/management/management.service";
import {RequestModelsService} from "../../../../services/request-models/request-models.service";
import {BaseMethodsService} from "../../../../services/base/base-methods.service";
import {ActivatedRoute} from "@angular/router";
import {DbSystemService} from '../../../../services/db-system/db-system.service';
import {TanslationService} from '../../../../services/translation-service/tanslation.service';

@Component({
  selector: 'app-message-account-detail',
  templateUrl: './message-account-detail.component.html',
  styleUrls: ['./message-account-detail.component.css']
})
export class MessageAccountDetailComponent implements OnInit {

  constructor(public  dbSystemService: DbSystemService,
              public baseCtrl: BaseMethodsService,
              public translationService: TanslationService,
              public requestModels: RequestModelsService,
              private routeParams: ActivatedRoute) {
  }

  messageAccountComboboxSetting = {
    singleSelection: true,
    idField: 'Id',
    textField: 'Description',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  submitted = false;
  dbMessageAccountId = null

  ngOnInit() {
    this.dbMessageAccountId = this.routeParams.snapshot.params['dbMessageAccountId'];
    const params = {
      DBMessageAccountId: this.dbMessageAccountId
    }
    this.dbSystemService.getDBMessageAccountDetails(params);
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.checkRequiredFields(this.dbSystemService.messageAccountForm);
    if (params != false) {
      this.dbSystemService.setDBMessageAccount(params);
    }
  }

  onItemSelect(item: any) {
    this.dbSystemService.messageAccountForm.AccountType.Value = item.Id;

    this.dbSystemService.messageAccountForm.Email.IsRequired = (this.dbSystemService.messageAccountForm.AccountType.Value == 10
      || this.dbSystemService.messageAccountForm.AccountType.Value == 15);

    this.baseCtrl.changeLanguageOnPage();
  }

  onDeleteConfirm() {
    this.dbMessageAccountId = this.routeParams.snapshot.params['dbMessageAccountId'];
    const params = {
      DBMessageAccountId: this.dbMessageAccountId
    }
    this.dbSystemService.deleteDBMessageAccount(params);
  }
}
