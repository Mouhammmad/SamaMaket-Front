import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementSettings } from './paiement-settings';

describe('PaiementSettings', () => {
  let component: PaiementSettings;
  let fixture: ComponentFixture<PaiementSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaiementSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(PaiementSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
