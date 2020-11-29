import {Component, Input, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service/api-service.service';
import {ActivatedRoute} from '@angular/router';
import {BaseMethodsService} from '../../../../../services/base/base-methods.service';

@Component({
  selector: 'app-api-message-details',
  templateUrl: './api-message-details.component.html',
  styleUrls: ['./api-message-details.component.css']
})
export class ApiMessageDetailsComponent implements OnInit {
  apiMessageId = null;
  submitted = false;

  @Input() openedFromModal = false;
  constructor(public apiServiceService: ApiServiceService,
              public baseCtrl: BaseMethodsService,
              private routeParams: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.apiMessageId = this.routeParams.snapshot.params['apiMessageId'];
    const params = {
      ApiMessageId: this.apiMessageId
    };
    this.apiServiceService.getApiMessageDetails(params);
  }

  onSubmit() {
    this.submitted = true;
    const requestParams = this.baseCtrl.checkRequiredFields(this.apiServiceService.apiMessageForm);
    if (requestParams != false) {
      this.apiServiceService.setAPIMessage(requestParams);
    }
  }

  onDeleteConfirm() {
    const params = {ApiMessageId: this.apiMessageId};
    this.apiServiceService.deleteAPIMessage(params);
  }

}
