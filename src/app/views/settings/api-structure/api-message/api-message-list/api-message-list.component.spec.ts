import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMessageListComponent } from './api-message-list.component';

describe('ApiMessageListComponent', () => {
  let component: ApiMessageListComponent;
  let fixture: ComponentFixture<ApiMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiMessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
