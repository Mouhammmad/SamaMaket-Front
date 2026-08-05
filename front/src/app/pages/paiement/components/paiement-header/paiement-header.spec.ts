import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementHeader } from './paiement-header';

describe('PaiementHeader', () => {
  let component: PaiementHeader;
  let fixture: ComponentFixture<PaiementHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaiementHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(PaiementHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
