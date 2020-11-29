import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service/api-service.service';
import {Router} from '@angular/router';
import {BaseMethodsService} from '../../../../../services/base/base-methods.service';
import {Enums} from '../../../../../models/enums/enums';
import {ManagementService} from '../../../../../services/management/management.service';

@Component({
  selector: 'app-api-end-point-list',
  templateUrl: './api-end-point-list.component.html',
  styleUrls: ['./api-end-point-list.component.css']
})
export class ApiEndPointListComponent implements OnInit {

  constructor(public apiServiceService: ApiServiceService,
              private router: Router,
              public managementService: ManagementService,
              public baseCtrl: BaseMethodsService) {
  }
  page = 1;
  requestParams = {
    SearchText: null,
    APIServiceId: null
  };

  ngOnInit(): void {
    this.requestParams = this.baseCtrl.fnCheckExistRequestParams(Enums.ListPages.EndpointList) != null ? this.baseCtrl.fnCheckExistRequestParams(Enums.ListPages.EndpointList) : this.requestParams;
    this.onSearch();
  }

  onSearch() {
    this.apiServiceService.getAPIEndpointList(this.requestParams);
  }

  onGotoDetail(s) {
    this.router.navigate(['/main/api-endpoint-details', s.APIEndpointId]);
  }

  onSelectApiService(service) {
    this.requestParams.APIServiceId = service.APIServiceId;
    this.onSearch();
  }

  onDeSelectApiService() {
    this.requestParams.APIServiceId = null;
    this.onSearch();
  }

}
