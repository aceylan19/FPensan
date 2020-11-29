import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAccountListComponent } from './message-account-list.component';

describe('MessageAccountListComponent', () => {
  let component: MessageAccountListComponent;
  let fixture: ComponentFixture<MessageAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
