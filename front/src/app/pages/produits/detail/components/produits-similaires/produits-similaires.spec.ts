import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsSimilaires } from './produits-similaires';

describe('ProduitsSimilaires', () => {
  let component: ProduitsSimilaires;
  let fixture: ComponentFixture<ProduitsSimilaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitsSimilaires],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitsSimilaires);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
