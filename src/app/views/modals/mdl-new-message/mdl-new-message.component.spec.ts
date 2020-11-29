import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlNewMessageComponent } from './mdl-new-message.component';

describe('MdlNewMessageComponent', () => {
  let component: MdlNewMessageComponent;
  let fixture: ComponentFixture<MdlNewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdlNewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlNewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
