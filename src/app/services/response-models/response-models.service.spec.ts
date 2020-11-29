import { TestBed } from '@angular/core/testing';

import { ResponseModelsService } from './response-models.service';

describe('ResponseModelsService', () => {
  let service: ResponseModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
