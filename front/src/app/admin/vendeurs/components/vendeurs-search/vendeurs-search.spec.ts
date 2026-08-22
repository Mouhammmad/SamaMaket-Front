import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeursSearch } from './vendeurs-search';

describe('VendeursSearch', () => {
  let component: VendeursSearch;
  let fixture: ComponentFixture<VendeursSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendeursSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(VendeursSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
