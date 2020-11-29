import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../../../../services/management/management.service';
import {BaseMethodsService} from '../../../../services/base/base-methods.service';
import {ActivatedRoute} from '@angular/router';
import {UserServiceService} from '../../../../services/user-service/user-service.service';
import {TanslationService} from '../../../../services/translation-service/tanslation.service';

@Component({
  selector: 'app-language-details',
  templateUrl: './language-details.component.html',
  styleUrls: ['./language-details.component.css']
})
export class LanguageDetailsComponent implements OnInit {

  constructor(public translationService: TanslationService,

              public baseCtrl: BaseMethodsService, public routeParams: ActivatedRoute) {
  }

  submitted = false;
  languageId = null;
  icon = null;

  ngOnInit() {
    this.languageId = this.routeParams.snapshot.params['languageId'];
    const params = {
      LanguageId: this.languageId
    };
    this.translationService.getLanguageDetails(params);
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.checkRequiredFields(this.translationService.languageFrom);
    if (params != false) {
      if (this.icon != null) {
        // @ts-ignore
        params.IconBase64 = this.icon.toString().substr(this.icon.toString().indexOf(',') + 1);
      }
      console.log(JSON.stringify(params));
      this.translationService.setLanguage(params);
    }
  }

  onDeleteConfirm() {
    const params = {
      LanguageId: this.languageId
    };
    this.translationService.deleteLanguage(params);
  }

  readThis(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.icon = reader.result;
      this.translationService.languageIcon = reader.result;
    };
  }

  onOpenFileDialog() {
    document.getElementById('icon').click();
  }

  removeImage() {
    this.translationService.languageIcon = null;
  }
}
