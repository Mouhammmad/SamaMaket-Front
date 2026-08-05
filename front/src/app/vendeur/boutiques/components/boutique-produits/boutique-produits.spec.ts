import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueProduits } from './boutique-produits';

describe('BoutiqueProduits', () => {
  let component: BoutiqueProduits;
  let fixture: ComponentFixture<BoutiqueProduits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueProduits],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueProduits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
