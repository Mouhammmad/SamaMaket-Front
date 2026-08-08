import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesVentes } from './statistiques-ventes';

describe('StatistiquesVentes', () => {
  let component: StatistiquesVentes;
  let fixture: ComponentFixture<StatistiquesVentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquesVentes],
    }).compileComponents();

    fixture = TestBed.createComponent(StatistiquesVentes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
