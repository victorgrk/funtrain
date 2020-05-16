/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { APIService } from './API.service';

describe('Service: API', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIService]
    });
  });

  it('should ...', inject([APIService], (service: APIService) => {
    expect(service).toBeTruthy();
  }));
});
