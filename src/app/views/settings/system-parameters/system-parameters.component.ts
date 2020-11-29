import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../../services/management/management.service';

import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import {BaseMethodsService} from "../../../services/base/base-methods.service";
import {DbSystemService} from '../../../services/db-system/db-system.service';

@Component({
  selector: 'app-system-parameters',
  templateUrl: './system-parameters.component.html',
  styleUrls: ['./system-parameters.component.css']
})
export class SystemParametersComponent implements OnInit {
  constructor(public dbSystemService: DbSystemService, public baseCtrl: BaseMethodsService) { }
  ngOnInit() {
    this.dbSystemService.getSysParameters();
  }

  onSubmit() {
    this.dbSystemService.setSysParameters();
  }

  cleanInput(item) {
    item.Value = null;
  }
}
