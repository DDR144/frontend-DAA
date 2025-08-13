import { TestBed } from '@angular/core/testing';

import { chefService } from './chef.service';

describe('ChefService', () => {
  let service: chefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(chefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
