import { TestBed } from '@angular/core/testing';

import { EndpointDataService } from './endpoint-data.service';

describe('EndpointDataService', () => {
  let service: EndpointDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
