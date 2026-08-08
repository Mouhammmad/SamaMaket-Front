import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitPreview } from './produit-preview';

describe('ProduitPreview', () => {
  let component: ProduitPreview;
  let fixture: ComponentFixture<ProduitPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
