import { TestBed } from '@angular/core/testing';

import { ToLoginGuard } from './to-login.guard';

describe('ToLoginGuard', () => {
  let guard: ToLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ToLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
