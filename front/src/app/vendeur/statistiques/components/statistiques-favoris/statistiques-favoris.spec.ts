import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesFavoris } from './statistiques-favoris';

describe('StatistiquesFavoris', () => {
  let component: StatistiquesFavoris;
  let fixture: ComponentFixture<StatistiquesFavoris>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquesFavoris],
    }).compileComponents();

    fixture = TestBed.createComponent(StatistiquesFavoris);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
