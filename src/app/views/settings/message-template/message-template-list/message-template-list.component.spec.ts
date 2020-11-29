import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTemplateListComponent } from './message-template-list.component';

describe('MessageTemplateListComponent', () => {
  let component: MessageTemplateListComponent;
  let fixture: ComponentFixture<MessageTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
