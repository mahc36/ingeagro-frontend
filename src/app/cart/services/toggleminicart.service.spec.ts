import { TestBed } from '@angular/core/testing';

import { ToggleminicartService } from './toggleminicart.service';

describe('ToggleminicartService', () => {
  let service: ToggleminicartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleminicartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
