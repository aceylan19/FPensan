import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../../../services/management/management.service';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-message-template-list',
  templateUrl: './message-template-list.component.html',
  styleUrls: ['./message-template-list.component.css']
})
export class MessageTemplateListComponent implements OnInit {

  constructor(public managementService: ManagementService, private router: Router) { }

  ngOnInit() {
    this.managementService.getDBMessageTemplateList();
  }
  onGotoDetail(mt) {
    this.router.navigate(['/main/message-template', mt.DBMessageTemplateId]);
  }
}
