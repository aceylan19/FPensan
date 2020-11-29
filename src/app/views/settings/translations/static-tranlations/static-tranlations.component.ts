import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../../../../services/management/management.service';
import {BaseMethodsService} from '../../../../services/base/base-methods.service';
import {EnumsList} from '../../../../models/enums/enum-list';
import {TanslationService} from '../../../../services/translation-service/tanslation.service';

@Component({
  selector: 'app-static-tranlations',
  templateUrl: './static-tranlations.component.html',
  styleUrls: ['./static-tranlations.component.css']
})
export class StaticTranlationsComponent implements OnInit {

  constructor(public translationService: TanslationService, public baseCtrl: BaseMethodsService) {
  }

  page = 1;
  platformsForResources = EnumsList.platformsForResources;
  platform = '';
  searchText = '';
  rowButton = true;

  ngOnInit() {
    this.page = 1;
    this.translationService.getStaticTranslations();
  }

  onSubmit() {
    if (this.translationService.allStaticTranslationList == null) {
      this.translationService.allStaticTranslationList = [];
    }
    this.translationService.staticTranslationList.forEach(st => {
      var isExist = false;
      this.translationService.allStaticTranslationList.forEach(ast => {
        if (ast.ResourceName == st.ResourceName) {
          isExist = true;
        }
      });
      if (!isExist) {
        this.translationService.allStaticTranslationList.push(st);
      }
    });

    this.translationService.setStaticTranslations();
  }

  onSearch() {

    this.translationService.staticTranslationList.forEach(stl => {
      let isExistResourceName = false;
      this.translationService.allStaticTranslationList.forEach(atl => {
        if (stl.ResourceName == atl.ResourceName) {
          isExistResourceName = true;
        }
      });
      if (isExistResourceName == false) {
        this.translationService.allStaticTranslationList.unshift(stl);
      }
    });

    this.translationService.staticTranslationList = [];
    this.translationService.allStaticTranslationList.forEach(at => {
      let isExistInLang = false;
      if (at.Platform.toString().indexOf(this.platform) != -1 &&
        (at.ResourceName.toString().toLocaleLowerCase().indexOf(this.searchText.toString().toLocaleLowerCase()) != -1 ||
          at.toString().indexOf(this.searchText.toString().toLocaleLowerCase()) != -1)) {
        this.translationService.staticTranslationList.push(at);
        isExistInLang = true;
      }
      if (isExistInLang == false && this.platform == '') {
        at.Translations.forEach(t => {
          if (t.Translation != null && t.Translation.toString().toLocaleLowerCase().indexOf(this.searchText.toString().toLocaleLowerCase()) != -1) {
            isExistInLang = true;
          }
        });
        if (isExistInLang) {
          this.translationService.staticTranslationList.push(at);
        }
      }
    });
  }

  onAddNewResource() {
    const params = {
      ResourceName: null,
      Platform: this.platformsForResources[0].Id,
      Translations: []
    };

    this.translationService.languageList.forEach(lang => {
      const langParam = {
        Language: lang.Id,
        Transation: null
      };
      params.Translations.push(langParam);
    });
    if (this.translationService.staticTranslationList == null) {
      this.translationService.staticTranslationList = [];
    }
    this.translationService.staticTranslationList.unshift(params);
  }

  onDeleteConfrim(trans) {
    let i = 0;
    this.translationService.allStaticTranslationList.forEach(att => {
      if (att.ResourceName == trans.ResourceName) {
        this.translationService.allStaticTranslationList.splice(i, 1);
      }
      i++;
    });
    i = 0;
    this.translationService.staticTranslationList.forEach(stt => {
      if (stt.ResourceName == trans.ResourceName) {
        this.translationService.allStaticTranslationList.splice(i, 1);
      }
      i++;
    });
  }
}
