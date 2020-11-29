import { TestBed } from '@angular/core/testing';

import { RequestModelsService } from './request-models.service';

describe('RequestModelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestModelsService = TestBed.get(RequestModelsService);
    expect(service).toBeTruthy();
  });
});
