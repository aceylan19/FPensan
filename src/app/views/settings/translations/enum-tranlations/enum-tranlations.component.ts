import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../../../../services/management/management.service';
import {BaseMethodsService} from '../../../../services/base/base-methods.service';
import {TanslationService} from '../../../../services/translation-service/tanslation.service';

@Component({
  selector: 'app-enum-tranlations',
  templateUrl: './enum-tranlations.component.html',
  styleUrls: ['./enum-tranlations.component.css']
})
export class EnumTranlationsComponent implements OnInit {

  constructor(public translationService: TanslationService, public baseCtrl: BaseMethodsService) {
  }

  page = 1;
  searchText = "";

  ngOnInit() {
    this.translationService.getEnumTranslations();
  }

  onSubmit() {
    this.page = 1;
    this.translationService.setEnumTranslations();
  }


  onSearch() {
    this.translationService.enumTranslationList = [];
    this.translationService.allEnumTranslationList.forEach(at => {
      let isExistInLang = false;
      if (at.Description.toString().toLocaleLowerCase().indexOf(this.searchText.toString().toLocaleLowerCase()) != -1 || at.toString().indexOf(this.searchText.toString().toLocaleLowerCase()) != -1) {
        this.translationService.enumTranslationList.push(at);
        isExistInLang = true;
      }
      if (isExistInLang == false) {
        at.Translations.forEach(t => {
          if (t.Translation != null && t.Translation.toString().toLocaleLowerCase().indexOf(this.searchText.toString().toLocaleLowerCase()) != -1) {
            isExistInLang = true;
          }
        });
        if (isExistInLang) {
          this.translationService.enumTranslationList.push(at);
        }
      }
    });
  }
}
