import { TestBed } from '@angular/core/testing';

import { Basemapservice } from './basemapservice';

describe('Basemapservice', () => {
  let service: Basemapservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Basemapservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
