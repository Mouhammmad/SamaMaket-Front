import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitTabs } from './produit-tabs';

describe('ProduitTabs', () => {
  let component: ProduitTabs;
  let fixture: ComponentFixture<ProduitTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
