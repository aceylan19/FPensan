import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../../../../services/management/management.service';
import {BaseMethodsService} from '../../../../services/base/base-methods.service';
import {Router} from '@angular/router';
import {Consts} from '../../../../models/consts/consts';
import {EnumsList} from '../../../../models/enums/enum-list';
import {Enums} from '../../../../models/enums/enums';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(public managementService: ManagementService,
              public route: Router,
              public baseCtrl: BaseMethodsService) {
  }

  userType = null;
  searchText = null;
  page = 1;
  pageRecordCounts = EnumsList.pageRecordCounts;
  dataPerPage = Consts.dataPerPage;

  requestParams = {
    userType: null,
    searchText: null
  };

  ngOnInit() {
    this.requestParams = this.baseCtrl.fnCheckExistRequestParams(Enums.ListPages.UserList) != null ? this.baseCtrl.fnCheckExistRequestParams(Enums.ListPages.UserList) : this.requestParams;
    this.search();
  }

  search() {
    this.page = 1;
    this.managementService.getUserList(this.requestParams);

  }

  onGotoDetails(record) {
    this.route.navigate(['/main/user', record.UserId]);
  }

  onShowValue(val) {
    // @ts-ignore
    this.dataPerPage = Number(val);
  }
}
