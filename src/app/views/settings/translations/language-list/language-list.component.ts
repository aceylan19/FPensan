import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../../../services/management/management.service';
import {Router} from '@angular/router';
import {TanslationService} from '../../../../services/translation-service/tanslation.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit {

  constructor(public translationService: TanslationService,
              private router: Router) { }

  ngOnInit() {
    this.translationService.getLanguageList();
  }
  onGotoDetail(language) {
    this.router.navigate(['/main/language', language.Id]);
  }
}
