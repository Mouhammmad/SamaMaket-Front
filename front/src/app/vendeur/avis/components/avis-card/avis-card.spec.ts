import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisCard } from './avis-card';

describe('AvisCard', () => {
  let component: AvisCard;
  let fixture: ComponentFixture<AvisCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
