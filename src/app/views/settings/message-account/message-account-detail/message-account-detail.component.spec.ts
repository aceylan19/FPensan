import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAccountDetailComponent } from './message-account-detail.component';

describe('MessageAccountDetailComponent', () => {
  let component: MessageAccountDetailComponent;
  let fixture: ComponentFixture<MessageAccountDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageAccountDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
