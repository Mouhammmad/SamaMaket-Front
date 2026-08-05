import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonStepper } from './livraison-stepper';

describe('LivraisonStepper', () => {
  let component: LivraisonStepper;
  let fixture: ComponentFixture<LivraisonStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonStepper],
    }).compileComponents();

    fixture = TestBed.createComponent(LivraisonStepper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
