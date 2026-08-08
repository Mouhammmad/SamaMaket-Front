import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesChart } from './statistiques-chart';

describe('StatistiquesChart', () => {
  let component: StatistiquesChart;
  let fixture: ComponentFixture<StatistiquesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquesChart],
    }).compileComponents();

    fixture = TestBed.createComponent(StatistiquesChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
