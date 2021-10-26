import { TestBed } from '@angular/core/testing';

import { DatabossApiService } from './databoss-api.service';

describe('DatabossApiService', () => {
  let service: DatabossApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabossApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
