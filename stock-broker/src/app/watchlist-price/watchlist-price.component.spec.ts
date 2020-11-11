import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistPriceComponent } from './watchlist-price.component';

describe('WatchlistPriceComponent', () => {
  let component: WatchlistPriceComponent;
  let fixture: ComponentFixture<WatchlistPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
