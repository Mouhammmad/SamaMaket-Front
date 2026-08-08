import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesProduits } from './statistiques-produits';

describe('StatistiquesProduits', () => {
  let component: StatistiquesProduits;
  let fixture: ComponentFixture<StatistiquesProduits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquesProduits],
    }).compileComponents();

    fixture = TestBed.createComponent(StatistiquesProduits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
