import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementMethods } from './paiement-methods';

describe('PaiementMethods', () => {
  let component: PaiementMethods;
  let fixture: ComponentFixture<PaiementMethods>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaiementMethods],
    }).compileComponents();

    fixture = TestBed.createComponent(PaiementMethods);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
