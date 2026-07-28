import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitHeader } from './produit-header';

describe('ProduitHeader', () => {
  let component: ProduitHeader;
  let fixture: ComponentFixture<ProduitHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
