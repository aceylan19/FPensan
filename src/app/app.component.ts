import { Component } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {BaseMethodsService} from './services/base/base-methods.service';
import {ManagementService} from './services/management/management.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fBaseProjectFE';
  constructor(private baseMtd: BaseMethodsService, private managementService: ManagementService) {
  }
}
