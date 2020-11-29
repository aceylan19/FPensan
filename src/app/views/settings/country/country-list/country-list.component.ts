import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../../../../services/management/management.service';
import {Router} from '@angular/router';
import {Enums} from '../../../../models/enums/enums';
import {BaseMethodsService} from '../../../../services/base/base-methods.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  constructor(public managementService: ManagementService, private router: Router, private baseCtrl: BaseMethodsService) {
  }

  requestParams = {};

  countryCode = "Ülke Kodu";

  ngOnInit() {
    this.requestParams = this.baseCtrl.fnCheckExistRequestParams(Enums.ListPages.CountryList) != null ? this.baseCtrl.fnCheckExistRequestParams(Enums.ListPages.CountryList) : this.requestParams;
    this.managementService.getCountryList();
  }


  onGotoDetail(l) {
    this.router.navigate(['/main/country', l.CountryId]);
  }
}
