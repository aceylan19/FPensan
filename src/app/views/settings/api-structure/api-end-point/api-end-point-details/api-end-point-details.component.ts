import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service/api-service.service';
import {RequestModelsService} from '../../../../../services/request-models/request-models.service';
import {BaseMethodsService} from '../../../../../services/base/base-methods.service';
import {ActivatedRoute} from '@angular/router';
import {ManagementService} from '../../../../../services/management/management.service';

@Component({
  selector: 'app-api-end-point-details',
  templateUrl: './api-end-point-details.component.html',
  styleUrls: ['./api-end-point-details.component.css']
})
export class ApiEndPointDetailsComponent implements OnInit {

  constructor(public apiServiceService: ApiServiceService,
              public requestModels: RequestModelsService,
              public baseCtrl: BaseMethodsService,
              public managementService: ManagementService,
              private routeParams: ActivatedRoute) {
  }

  apiEndpointId = null;
  submitted = false;
  rowButton = true;

  ngOnInit(): void {
    this.apiEndpointId = this.routeParams.snapshot.params['apiEndpointId'];
    const params = {
      ApiServiceId: this.apiEndpointId
    };
    this.apiServiceService.getAPIEndpointDetails(params);
  }

  onSubmit() {
    this.submitted = true;
    this.apiServiceService.apiEndpointForm.APIResponses.Value.splice(this.apiServiceService.apiEndpointForm.APIResponses.Value.length - 1, 1);
    const requestParams = this.baseCtrl.checkRequiredFields(this.apiServiceService.apiEndpointForm);
    if (requestParams) {
      this.apiServiceService.setAPIEndpoint(requestParams);
    }
    this.onAddNewAPIResponse();

  }

  onDeleteConfirm() {
    const params = {APIEndpointId: this.apiEndpointId};
    this.apiServiceService.deleteAPIEndpoint(params);
  }

  onSelectApiService(service) {
    this.apiServiceService.apiEndpointForm.APIServiceId.Value = service.APIServiceId;
  }

  onDeSelectApiService() {
    this.apiServiceService.apiEndpointForm.APIServiceId.Value = null;
  }

  onSelectApiMessage(service, ap) {
    console.log(JSON.stringify(service));
    ap.APIMessageId.Value = service.APIMessageId;
  }

  onDeSelectApiMessage(ap) {
    ap.APIMessageId.Value = null;
  }

  onAddNewAPIResponse() {
    const lastObj = this.apiServiceService.apiEndpointForm.APIResponses.Value[this.apiServiceService.apiEndpointForm.APIResponses.Value.length - 1];
    if (lastObj.DefaultMessage.Value != null && lastObj.DefaultMessage.Value != '') {
      const pEndPointParams = this.requestModels.fnCreateAPIResponseModel();
      pEndPointParams.Level.Value = this.apiServiceService.apiEndpointForm.APIResponses.Value[this.apiServiceService.apiEndpointForm.APIResponses.Value.length - 1].Level.Value + 1;
      this.apiServiceService.apiEndpointForm.APIResponses.Value.push(pEndPointParams);
    }
  }

  onDeleteApiResponse(ap, index) {
    if (ap.APIResponseId != null) {
      this.apiServiceService.deleteAPIResponse(ap);
    } else {
      this.apiServiceService.apiEndpointForm.APIResponses.Value.splice(index, 1);
    }
  }

  onOpenUpdateMessage() {
    document.getElementById('btnOpenMessage').click();
  }

}
