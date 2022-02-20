import { TestBed } from '@angular/core/testing';

import { IpDataService } from './ip-data.service';

describe('IpDataService', () => {
  let service: IpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
