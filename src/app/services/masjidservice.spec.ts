import { TestBed } from '@angular/core/testing';

import { Masjidservice } from './masjidservice';

describe('Masjidservice', () => {
  let service: Masjidservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Masjidservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
