import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesPeriode } from './statistiques-periode';

describe('StatistiquesPeriode', () => {
  let component: StatistiquesPeriode;
  let fixture: ComponentFixture<StatistiquesPeriode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquesPeriode],
    }).compileComponents();

    fixture = TestBed.createComponent(StatistiquesPeriode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
