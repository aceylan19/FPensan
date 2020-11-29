import { TestBed } from '@angular/core/testing';

import { DbSystemService } from './db-system.service';

describe('DbSystemService', () => {
  let service: DbSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
