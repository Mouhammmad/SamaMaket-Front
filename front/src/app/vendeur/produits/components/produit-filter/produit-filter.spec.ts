import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitFilter } from './produit-filter';

describe('ProduitFilter', () => {
  let component: ProduitFilter;
  let fixture: ComponentFixture<ProduitFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
