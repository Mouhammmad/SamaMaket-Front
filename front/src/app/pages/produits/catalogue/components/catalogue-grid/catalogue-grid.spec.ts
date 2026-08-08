import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueGrid } from './catalogue-grid';

describe('CatalogueGrid', () => {
  let component: CatalogueGrid;
  let fixture: ComponentFixture<CatalogueGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
