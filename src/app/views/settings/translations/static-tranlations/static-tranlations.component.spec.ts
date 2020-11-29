import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticTranlationsComponent } from './static-tranlations.component';

describe('StaticTranlationsComponent', () => {
  let component: StaticTranlationsComponent;
  let fixture: ComponentFixture<StaticTranlationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticTranlationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticTranlationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
