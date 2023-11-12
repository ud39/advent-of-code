import { TestBed } from '@angular/core/testing';

import { VisualAocService } from './visual-aoc.service';

describe('VisualAocService', () => {
  let service: VisualAocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualAocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
