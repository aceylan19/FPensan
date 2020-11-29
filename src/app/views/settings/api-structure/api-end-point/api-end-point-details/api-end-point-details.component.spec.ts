import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiEndPointDetailsComponent } from './api-end-point-details.component';

describe('ApiEndPointDetailsComponent', () => {
  let component: ApiEndPointDetailsComponent;
  let fixture: ComponentFixture<ApiEndPointDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiEndPointDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiEndPointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
