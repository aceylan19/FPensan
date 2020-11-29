import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTranslationsComponent } from './dynamic-translations.component';

describe('DynamicTranslationsComponent', () => {
  let component: DynamicTranslationsComponent;
  let fixture: ComponentFixture<DynamicTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
