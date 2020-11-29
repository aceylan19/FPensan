import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service/api-service.service';
import {Enums} from '../../../../../models/enums/enums';
import {BaseMethodsService} from '../../../../../services/base/base-methods.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-api-message-list',
  templateUrl: './api-message-list.component.html',
  styleUrls: ['./api-message-list.component.css']
})
export class ApiMessageListComponent implements OnInit {
  page = 1;

  constructor(public apiServiceService: ApiServiceService,
              public router: Router,
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
    this.apiServiceService.getApiMessageList(this.requestParams);
  }

  onGotoDetail(s) {
    this.router.navigate(['/main/api-message-details', s.APIMessageId]);
  }
}
