import { TestBed } from '@angular/core/testing';

import { KeygenerationService } from './keygeneration.service';

describe('KeygenerationService', () => {
  let service: KeygenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeygenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
