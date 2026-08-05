import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementStatus } from './paiement-status';

describe('PaiementStatus', () => {
  let component: PaiementStatus;
  let fixture: ComponentFixture<PaiementStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaiementStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(PaiementStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
