import { TestBed } from '@angular/core/testing';

import { LevelManagementService } from './level-management.service';

describe('LevelManagementService', () => {
  let service: LevelManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
