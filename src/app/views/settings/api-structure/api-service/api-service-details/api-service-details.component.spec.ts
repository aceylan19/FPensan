import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiServiceDetailsComponent } from './api-service-details.component';

describe('ApiServiceDetailsComponent', () => {
  let component: ApiServiceDetailsComponent;
  let fixture: ComponentFixture<ApiServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiServiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
