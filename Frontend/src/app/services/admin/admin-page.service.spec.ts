import { TestBed } from '@angular/core/testing';

import { AdminPageService } from './admin-page.service';

describe('AdminPageService', () => {
  let service: AdminPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
