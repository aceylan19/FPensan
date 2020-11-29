import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumTranlationsComponent } from './enum-tranlations.component';

describe('EnumTranlationsComponent', () => {
  let component: EnumTranlationsComponent;
  let fixture: ComponentFixture<EnumTranlationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumTranlationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumTranlationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
