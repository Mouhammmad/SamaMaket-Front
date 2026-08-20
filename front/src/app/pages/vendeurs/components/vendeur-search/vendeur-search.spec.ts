import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurSearch } from './vendeur-search';

describe('VendeurSearch', () => {
  let component: VendeurSearch;
  let fixture: ComponentFixture<VendeurSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendeurSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(VendeurSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
