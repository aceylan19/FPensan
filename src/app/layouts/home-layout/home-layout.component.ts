import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <app-menu></app-menu>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class HomeLayoutComponent implements OnInit {

  @Input() changeLanguage: EventEmitter<null> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
}
