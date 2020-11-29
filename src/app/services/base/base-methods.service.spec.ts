import { TestBed } from '@angular/core/testing';

import { BaseMethodsService } from './base-methods.service';

describe('BaseMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseMethodsService = TestBed.get(BaseMethodsService);
    expect(service).toBeTruthy();
  });
});
