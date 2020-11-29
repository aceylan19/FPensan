import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlDeleteConfirmComponent } from './mdl-delete-confirm.component';

describe('MdlDeleteConfirmComponent', () => {
  let component: MdlDeleteConfirmComponent;
  let fixture: ComponentFixture<MdlDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdlDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
