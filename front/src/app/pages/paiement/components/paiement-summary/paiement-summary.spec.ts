import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementSummary } from './paiement-summary';

describe('PaiementSummary', () => {
  let component: PaiementSummary;
  let fixture: ComponentFixture<PaiementSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaiementSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(PaiementSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
