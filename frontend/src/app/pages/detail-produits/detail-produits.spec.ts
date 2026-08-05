import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProduits } from './detail-produits';

describe('DetailProduits', () => {
  let component: DetailProduits;
  let fixture: ComponentFixture<DetailProduits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProduits],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailProduits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
