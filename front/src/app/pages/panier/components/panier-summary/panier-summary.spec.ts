import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierSummary } from './panier-summary';

describe('PanierSummary', () => {
  let component: PanierSummary;
  let fixture: ComponentFixture<PanierSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(PanierSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
