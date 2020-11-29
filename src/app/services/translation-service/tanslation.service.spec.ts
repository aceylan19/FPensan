import { TestBed } from '@angular/core/testing';

import { TanslationService } from './tanslation.service';

describe('TanslateServiceService', () => {
  let service: TanslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TanslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
