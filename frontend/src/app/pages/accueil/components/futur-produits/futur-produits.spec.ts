import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturProduits } from './futur-produits';

describe('FuturProduits', () => {
  let component: FuturProduits;
  let fixture: ComponentFixture<FuturProduits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuturProduits],
    }).compileComponents();

    fixture = TestBed.createComponent(FuturProduits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
