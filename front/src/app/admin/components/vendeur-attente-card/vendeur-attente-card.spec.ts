import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurAttenteCard } from './vendeur-attente-card';

describe('VendeurAttenteCard', () => {
  let component: VendeurAttenteCard;
  let fixture: ComponentFixture<VendeurAttenteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendeurAttenteCard],
    }).compileComponents();

    fixture = TestBed.createComponent(VendeurAttenteCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
