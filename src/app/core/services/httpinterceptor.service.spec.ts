import { TestBed } from '@angular/core/testing';

import { HttpinsterceptorService } from './httpinterceptor.service';

describe('HttpinsterceptorService', () => {
  let service: HttpinsterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpinsterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
