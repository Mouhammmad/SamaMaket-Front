import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierStepper } from './panier-stepper';

describe('PanierStepper', () => {
  let component: PanierStepper;
  let fixture: ComponentFixture<PanierStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierStepper],
    }).compileComponents();

    fixture = TestBed.createComponent(PanierStepper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
