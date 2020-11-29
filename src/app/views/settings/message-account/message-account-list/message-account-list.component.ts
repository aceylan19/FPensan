import { Component, OnInit } from '@angular/core';
import {ManagementService} from "../../../../services/management/management.service";
import {Router} from "@angular/router";
import {DbSystemService} from '../../../../services/db-system/db-system.service';

@Component({
  selector: 'app-message-account-list',
  templateUrl: './message-account-list.component.html',
  styleUrls: ['./message-account-list.component.css']
})
export class MessageAccountListComponent implements OnInit {
  constructor(public  dbSystemService: DbSystemService,
  private router: Router) { }
  ngOnInit() {
    this.dbSystemService.getDBMessageAccountList();
  }

  onGotoDetail(messageAccount) {
    this.router.navigate(['/main/message-account', messageAccount.DBMessageAccountId]);
  }
}
