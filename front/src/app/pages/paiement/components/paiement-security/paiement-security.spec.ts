import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementSecurity } from './paiement-security';

describe('PaiementSecurity', () => {
  let component: PaiementSecurity;
  let fixture: ComponentFixture<PaiementSecurity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaiementSecurity],
    }).compileComponents();

    fixture = TestBed.createComponent(PaiementSecurity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
