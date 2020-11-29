import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit {
  constructor(private _routeParams: Router, private router: Router) {
  }
  ngOnInit() {
    if (this._routeParams.url.toString().indexOf('reset-password') == -1) {
      this.router.navigate(['/login']);
    }
  }

}
