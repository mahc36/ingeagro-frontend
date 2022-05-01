import { TestBed } from '@angular/core/testing';

import { IdentificationTypeService } from './identification-type.service';

describe('DocumentTypeService', () => {
  let service: IdentificationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentificationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
