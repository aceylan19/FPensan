import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMessageDetailsComponent } from './api-message-details.component';

describe('ApiMessageDetailsComponent', () => {
  let component: ApiMessageDetailsComponent;
  let fixture: ComponentFixture<ApiMessageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiMessageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
