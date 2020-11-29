import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service/api-service.service';
import {Enums} from '../../../../../models/enums/enums';
import {BaseMethodsService} from '../../../../../services/base/base-methods.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  constructor(public apiServiceService: ApiServiceService,
              private router: Router,
              public baseCtrl: BaseMethodsService) {
  }

  requestParams = {
    SearchText: null
  };

  ngOnInit(): void {
    this.requestParams = this.baseCtrl.fnCheckExistRequestParams(Enums.ListPages.ServiceList) != null ? this.baseCtrl.fnCheckExistRequestParams(Enums.ListPages.ServiceList) : this.requestParams;
    this.onSearch();
  }


  onSearch() {
    this.apiServiceService.getAPIServiceList(this.requestParams);
  }

  onGotoDetail(s) {
    this.router.navigate(['/main/api-service-details', s.APIServiceId]);

  }
}
