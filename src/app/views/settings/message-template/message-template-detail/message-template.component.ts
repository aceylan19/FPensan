import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../../../../services/management/management.service';
import {BaseMethodsService} from '../../../../services/base/base-methods.service';
import {ActivatedRoute} from '@angular/router';
import {DbSystemService} from '../../../../services/db-system/db-system.service';

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.css']
})
export class MessageTemplateComponent implements OnInit {


  constructor(public dbSystemService: DbSystemService, public baseCtrl: BaseMethodsService, private routeParams: ActivatedRoute) {
  }

  submitted = false;
  dbMessageTemplateId = null;

  ngOnInit() {
    this.dbMessageTemplateId = this.routeParams.snapshot.params['dbMessageTemplateId'];
    const params = {
      DBMessageTemplateId: this.dbMessageTemplateId
    };
    this.dbSystemService.getDBMessageTemplateDetails(params);
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.checkRequiredFields(this.dbSystemService.messageTemplateForm);
    if (params != false) {
      console.log(JSON.stringify(params));
      this.dbSystemService.setDBMessageTemplate(params);
    }
  }

  onDeleteConfirm() {
    const params = {
      DBMessageTemplateId: this.dbMessageTemplateId
    };
    this.dbSystemService.deleteDBMessageTemplate(params);
  }
}
