import { TestBed } from '@angular/core/testing';

import { StockColorsService } from './stock-colors.service';

describe('StockColorsService', () => {
  let service: StockColorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockColorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
