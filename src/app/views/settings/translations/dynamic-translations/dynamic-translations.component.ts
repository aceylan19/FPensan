import {Component, OnInit} from '@angular/core';
import {BaseMethodsService} from '../../../../services/base/base-methods.service';
import {TanslationService} from '../../../../services/translation-service/tanslation.service';

@Component({
  selector: 'app-dynamic-translations',
  templateUrl: './dynamic-translations.component.html',
  styleUrls: ['./dynamic-translations.component.css']
})
export class DynamicTranslationsComponent implements OnInit {
  constructor(public translationService: TanslationService, public baseCtrl: BaseMethodsService) {
  }

  page = 1;
  searchText = "";

  ngOnInit() {
    this.translationService.getDynamicTranslations();
  }

  onSubmit() {
    this.page = 1;
    this.translationService.setDynamicTranslations();
  }

  onSearch() {
    this.translationService.dynamicTranslationList = [];
    this.translationService.allDynamicTranslationList.forEach(at => {
      let isExistInLang = false;
      if (at.TableName.toString().toLocaleLowerCase().indexOf(this.searchText.toString().toLocaleLowerCase()) != -1 || at.toString().indexOf(this.searchText.toString().toLocaleLowerCase()) != -1) {
        this.translationService.dynamicTranslationList.push(at);
        isExistInLang = true;
      }
      if (isExistInLang == false) {
        at.Translations.forEach(t => {
          if (t.Translation != null && t.Translation.toString().toLocaleLowerCase().indexOf(this.searchText.toString().toLocaleLowerCase()) != -1) {
            isExistInLang = true;
          }
        });
        if (isExistInLang) {
          this.translationService.dynamicTranslationList.push(at);
        }
      }
    });
  }
}
