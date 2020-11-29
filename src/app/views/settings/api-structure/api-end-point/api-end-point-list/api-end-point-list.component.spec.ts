import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiEndPointListComponent } from './api-end-point-list.component';

describe('ApiEndPointListComponent', () => {
  let component: ApiEndPointListComponent;
  let fixture: ComponentFixture<ApiEndPointListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiEndPointListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiEndPointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
