import { TestBed } from '@angular/core/testing';

import { ErrorManagementService } from './error-management.service';

describe('ErrorManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorManagementService = TestBed.get(ErrorManagementService);
    expect(service).toBeTruthy();
  });
});
