import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../../../../../services/management/management.service';
import {BaseMethodsService} from '../../../../../services/base/base-methods.service';
import {ActivatedRoute} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service/api-service.service';
import {RequestModelsService} from '../../../../../services/request-models/request-models.service';

@Component({
  selector: 'app-api-service-details',
  templateUrl: './api-service-details.component.html',
  styleUrls: ['./api-service-details.component.css']
})
export class ApiServiceDetailsComponent implements OnInit {

  apiServiceId = null;
  submitted = false;
  rowButton = true;

  constructor(public apiServiceService: ApiServiceService,
              public requestModels: RequestModelsService,
              public baseCtrl: BaseMethodsService,
              private routeParams: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.apiServiceId = this.routeParams.snapshot.params['apiServiceId'];
    const params = {
      ApiServiceId: this.apiServiceId
    };
    this.apiServiceService.getAPIServiceDetails(params);
  }

  onSubmit() {
    const requestParams = this.baseCtrl.checkRequiredFields(this.apiServiceService.apiServiceForm);
    if (requestParams != false) {
      this.apiServiceService.apiServiceForm.Endpoints.Value.splice(this.apiServiceService.apiServiceForm.Endpoints.Value.length - 1, 1);
      this.apiServiceService.setAPIService(requestParams);
      this.onAddNewEndPoint();
    }
  }

  onDeleteConfirm() {
    const params = {ApiServiceId: this.apiServiceId};
    this.apiServiceService.deleteAPIService(params);
  }

  onDeleteConfirmEndPoint(ep, index) {
    if (ep.APIEndpointId != null) {
      this.apiServiceService.deleteAPIEndpoint(ep);
    } else {
      this.apiServiceService.apiServiceForm.Endpoints.Value.splice(index, 1);
    }
  }

  onAddNewEndPoint() {
    const lastObj = this.apiServiceService.apiServiceForm.Endpoints.Value[this.apiServiceService.apiServiceForm.Endpoints.Value.length - 1];
    if (lastObj.EndpointName != null && lastObj.EndpointCode != '') {
      const pEndPointParams = this.requestModels.fnCreateEndpointModel();
      pEndPointParams.EndpointCode = this.apiServiceService.apiServiceForm.Endpoints.Value[this.apiServiceService.apiServiceForm.Endpoints.Value.length - 1].EndpointCode + 1;
      this.apiServiceService.apiServiceForm.Endpoints.Value.push(pEndPointParams);
    }
  }

}
