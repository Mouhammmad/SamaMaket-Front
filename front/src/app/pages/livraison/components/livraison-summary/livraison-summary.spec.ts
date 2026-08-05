import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonSummary } from './livraison-summary';

describe('LivraisonSummary', () => {
  let component: LivraisonSummary;
  let fixture: ComponentFixture<LivraisonSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(LivraisonSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
