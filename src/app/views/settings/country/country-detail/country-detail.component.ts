import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../../../../services/management/management.service';
import {BaseMethodsService} from "../../../../services/base/base-methods.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  constructor(public managementService: ManagementService, public baseCtrl: BaseMethodsService,
              private routeParams: ActivatedRoute) {
  }

  countryId = null;
  submitted = false;
  icon = null

  ngOnInit() {
    this.countryId = this.routeParams.snapshot.params['countryId'];
    const params = {
      CountryId: this.countryId
    }
    this.managementService.getCountryDetails(params);
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.checkRequiredFields(this.managementService.countryDetailsForm);
    if (params != false) {
      if (this.icon != null) {
        // @ts-ignore
        params.IconBase64 = this.icon.toString().substr(this.icon.toString().indexOf(',') + 1);
      }
      this.managementService.setCountry(params);
    }
  }

  onDeleteConfirm() {
    const params = {
      CountryId: this.countryId
    }
    this.managementService.deleteCountry(params);
  }

  onItemSelect(item: any) {
    this.managementService.selectedLanguage.push(item.Id);
    this.managementService.countryDetailsForm.Language.Value = item.Id;
  }

  onOpenFileDialog() {
    document.getElementById('icon').click();
  }

  readThis(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.icon = reader.result;
    };
  }

}
