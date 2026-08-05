import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueFilter } from './catalogue-filter';

describe('CatalogueFilter', () => {
  let component: CatalogueFilter;
  let fixture: ComponentFixture<CatalogueFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
