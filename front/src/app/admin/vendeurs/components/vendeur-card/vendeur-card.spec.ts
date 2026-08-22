import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurCard } from './vendeur-card';

describe('VendeurCard', () => {
  let component: VendeurCard;
  let fixture: ComponentFixture<VendeurCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendeurCard],
    }).compileComponents();

    fixture = TestBed.createComponent(VendeurCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
